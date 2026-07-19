#!/usr/bin/env python3
"""Regenerate the graph data embedded in src/network.js from static/data/aiwc.ods.

The ods is the master AI War Cloud database (upstream: gitlab.com/sarahciston/aiwar).
This rebuilds the `state.rawData = [...]` block in src/network.js — the same shape
the original gravis export produced — from the node sheets (N_*) and edge sheets
(E_*), so new upstream nodes/fields land in the app by re-running this script.

Node colors: the original export baked community colors per node; they are kept
in scripts/node-colors.json. Known ids keep their color; new nodes inherit the
most common color among their neighbors (and the inferred color is written back
to node-colors.json so assignments stay stable across runs).

Requires: pandas, odfpy  (pip install pandas odfpy)
Usage: python3 scripts/generate-graph-data.py
"""

import json
import re
import sys
from collections import Counter
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parent.parent
ODS_PATH = ROOT / "static/data/aiwc.ods"
NETWORK_JS = ROOT / "src/network.js"
COLORS_PATH = ROOT / "scripts/node-colors.json"

NODE_SHEETS = ["N_Systems", "N_Civic", "N_Historical", "N_Stakeholders", "N_People"]
# Same sheets index.qmd feeds to networkx (E_hierarchical intentionally excluded)
EDGE_SHEETS = ["E_isDeployedBy", "E_isDevelopedBy", "E_place", "E_connection", "E_people"]
SKIP_NODE_COLUMNS = {"aaaanchor", "anchor"}
EDGE_METADATA_COLUMNS = ["hover", "reference"]

# Graph-level settings preserved from the original export
GRAPH_METADATA = {
    "edge_opacity": 0.25,
    "node_opacity": 0,
    "edge_label_size": 5,
    "node_label_size": 6,
    "node_click": "Details: $hover",
}


def clean(value):
    """None for empty cells; ints for whole numbers; trimmed strings otherwise."""
    if value is None or (isinstance(value, float) and pd.isna(value)):
        return None
    if isinstance(value, float) and value.is_integer():
        return int(value)
    if isinstance(value, str):
        value = value.strip()
        return value or None
    return value


def main():
    sheets = pd.ExcelFile(ODS_PATH)
    source = NETWORK_JS.read_text()
    colors = json.loads(COLORS_PATH.read_text()) if COLORS_PATH.exists() else {}

    nodes = {}
    for sheet in NODE_SHEETS:
        df = pd.read_excel(sheets, sheet_name=sheet)
        for _, row in df.iterrows():
            node_id = clean(row.get("id"))
            if not node_id:
                continue
            if node_id in nodes:
                print(f"warning: duplicate node id {node_id!r} in {sheet}, keeping first")
                continue
            metadata = {}
            for column in df.columns:
                if column in SKIP_NODE_COLUMNS or str(column).startswith("Unnamed"):
                    continue
                value = clean(row.get(column))
                if value is not None:
                    metadata[column] = value
            if "name" not in metadata:
                metadata["name"] = node_id
            nodes[node_id] = {"metadata": metadata}

    edges = []
    dropped = []
    seen_edges = set()
    for sheet in EDGE_SHEETS:
        df = pd.read_excel(sheets, sheet_name=sheet)
        for _, row in df.iterrows():
            src, dst = clean(row.get("source")), clean(row.get("target"))
            if not src or not dst:
                continue
            if src not in nodes or dst not in nodes:
                dropped.append(f"{sheet}: {src} -> {dst}")
                continue
            triple = (src, dst, clean(row.get("label")))
            if triple in seen_edges:
                print(f"warning: duplicate edge skipped ({sheet}): "
                      f"{src} -{triple[2]}-> {dst}")
                continue
            seen_edges.add(triple)
            edge = {"source": src, "target": dst}
            label = clean(row.get("label"))
            if label:
                edge["label"] = label
            metadata = {}
            for column in EDGE_METADATA_COLUMNS:
                value = clean(row.get(column)) if column in df.columns else None
                # E_connection's hover column holds numeric flags, not text
                if isinstance(value, str):
                    metadata[column] = value
            if metadata:
                edge["metadata"] = metadata
            edges.append(edge)

    # Node colors: drop sidecar ids gone from the graph (renames/deletions),
    # keep the rest, and infer new ones from colored neighbors — iterated to a
    # fixpoint so inference is independent of sheet order (a chain of new
    # nodes colors fully in one run).
    stale = sorted(set(colors) - set(nodes))
    for node_id in stale:
        print(f"warning: dropping color for unknown node id {node_id!r} "
              "(renamed or removed upstream)")
        del colors[node_id]
    neighbors = {}
    for edge in edges:
        neighbors.setdefault(edge["source"], []).append(edge["target"])
        neighbors.setdefault(edge["target"], []).append(edge["source"])
    changed = True
    while changed:
        changed = False
        for node_id in nodes:
            if node_id in colors:
                continue
            counts = Counter(
                colors[n] for n in neighbors.get(node_id, []) if n in colors
            )
            if counts:
                colors[node_id] = counts.most_common(1)[0][0]
                changed = True
    for node_id, node in nodes.items():
        if node_id in colors:
            node["metadata"]["color"] = colors[node_id]

    raw_data = [
        {
            "nodes": nodes,
            "edges": edges,
            "directed": False,
            "metadata": GRAPH_METADATA,
        }
    ]
    serialized = json.dumps(raw_data, indent=2, ensure_ascii=True)

    updated, count = re.subn(
        r"state\.rawData = \[.*?\n\s*\];",
        lambda _: "state.rawData = " + serialized + ";",
        source,
        count=1,
        flags=re.S,
    )
    if count != 1:
        sys.exit("error: could not locate the state.rawData block in src/network.js")
    NETWORK_JS.write_text(updated)
    # Written only after network.js succeeded so the two files never desync
    COLORS_PATH.write_text(json.dumps(colors, indent=2, sort_keys=True) + "\n")

    print(f"nodes: {len(nodes)}  edges: {len(edges)}  colored: "
          f"{sum(1 for n in nodes.values() if 'color' in n['metadata'])}")
    if dropped:
        print(f"dropped {len(dropped)} edges with unknown endpoints:")
        for line in dropped:
            print("  -", line)


if __name__ == "__main__":
    main()
