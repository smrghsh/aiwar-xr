import * as THREE from "three";
import Experience from "../Experience.js";

const CANVAS_WIDTH = 1024;
const MIN_CANVAS_HEIGHT = 190;
const MAX_CANVAS_HEIGHT = 1400;
const PLANE_WIDTH = 0.8;

const FONT_FAMILY = "ui-monospace, Menlo, Consolas, monospace";
const TITLE_FONT = `bold 34px ${FONT_FAMILY}`;
const META_FONT = `20px ${FONT_FAMILY}`;
const SECTION_FONT = `bold 15px ${FONT_FAMILY}`;
const LABEL_FONT = `bold 18px ${FONT_FAMILY}`;
const BODY_FONT = `18px ${FONT_FAMILY}`;

const PADDING = 28;
const LINE_HEIGHT = 24;
const TITLE_LINE_HEIGHT = 42;
const FIELD_GAP = 6;
const LABEL_COLUMN = 240;
const MAX_FIELD_LINES = 5;

// Graph node metadata (from aiwc.ods via the embedded gravis export)
// Shared with MobilePanel.js
export const NODE_FIELDS = [
  ["type", "Type"],
  ["airo:type", "Role"],
  ["MLTask", "ML Task"],
  ["MLTasks", "ML Tasks"],
  ["militaryUse", "Military Use"],
  ["civicUse", "Civic Use"],
  ["purpose", "Purpose"],
  ["capacity", "Capabilities"],
  ["vair:technique", "Technique"],
  ["output", "Outputs"],
  ["vair:riskSources", "Risk Sources"],
  ["impact", "Impacts"],
  ["people", "People"],
  ["details", "Details"],
  ["source", "Source"],
];

// Prose columns from aiwarcloud-table.csv
export const RECORD_FIELDS = [
  ["Used By", "Used By"],
  ["Military Purpose", "Military Purpose"],
  ["Type of Tech", "Type of Tech"],
  ["Repurpose (Potential/Actual)", "Repurpose"],
];

export function cleanValue(value) {
  if (value === undefined || value === null) return "";
  if (typeof value === "number" && !Number.isFinite(value)) return "";
  const text = String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[,;\s]+$/, "");
  return text === "NaN" ? "" : text;
}

function breakLongWord(ctx, word, maxWidth) {
  if (ctx.measureText(word).width <= maxWidth) return [word];
  const parts = [];
  let chunk = "";
  for (const char of word) {
    if (chunk && ctx.measureText(chunk + char).width > maxWidth) {
      parts.push(chunk);
      chunk = char;
    } else {
      chunk += char;
    }
  }
  if (chunk) parts.push(chunk);
  return parts;
}

function wrapText(ctx, text, maxWidth, maxLines = Infinity) {
  const words = text
    .split(/\s+/)
    .flatMap((word) => breakLongWord(ctx, word, maxWidth));
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? current + " " + word : word;
    if (!current || ctx.measureText(candidate).width <= maxWidth) {
      current = candidate;
      continue;
    }
    if (lines.length + 1 >= maxLines) {
      let kept = current;
      while (
        kept.includes(" ") &&
        ctx.measureText(kept + " …").width > maxWidth
      ) {
        kept = kept.slice(0, kept.lastIndexOf(" "));
      }
      lines.push(kept + " …");
      return lines;
    }
    lines.push(current);
    current = word;
  }
  if (current) lines.push(current);
  return lines;
}

export default class Tooltip {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.canvas = document.createElement("canvas");
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = MIN_CANVAS_HEIGHT;
    this.ctx = this.canvas.getContext("2d");

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.generateMipmaps = false;

    this._planeHeight = PLANE_WIDTH * (this.canvas.height / CANVAS_WIDTH);
    const geometry = new THREE.PlaneGeometry(PLANE_WIDTH, this._planeHeight);
    const material = new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.renderOrder = 999;
    this.mesh.visible = false;
    this.scene.add(this.mesh);

    this._tmpWorldPos = new THREE.Vector3();
    this._tmpTarget = new THREE.Vector3();
    this.mesh.onBeforeRender = (_renderer, _scene, camera) => {
      this.mesh.getWorldPosition(this._tmpWorldPos);
      this._tmpTarget.set(
        camera.position.x,
        this._tmpWorldPos.y,
        camera.position.z
      );
      this.mesh.lookAt(this._tmpTarget);
    };

    this._currentKey = null;
  }

  render(data, key) {
    // Record presence and connection count are part of the key so a panel
    // drawn before the CSV/graph finished loading gets redrawn once its
    // data is available.
    const cacheKey = `${key}:${data?.record ? "r" : "n"}:${
      data?.connections?.length || 0
    }`;
    if (this._currentKey !== cacheKey) {
      this._draw(this._buildLayout(data));
      this._currentKey = cacheKey;
    }
    this.mesh.visible = true;
  }

  // Measure pass: computes wrapped lines and y positions before the canvas is
  // resized (resizing clears the context), so the draw pass just paints.
  _buildLayout(data) {
    const { ctx } = this;
    const node = data?.node || null;
    const record = data?.record || null;
    const maxWidth = CANVAS_WIDTH - PADDING * 2;
    const valueWidth = maxWidth - LABEL_COLUMN;
    const items = [];
    let y = PADDING;

    const pushField = (label, value) => {
      if (!value) return;
      ctx.font = BODY_FONT;
      const lines = wrapText(ctx, value, valueWidth, MAX_FIELD_LINES);
      if (y + lines.length * LINE_HEIGHT > MAX_CANVAS_HEIGHT - PADDING) return;
      items.push({ kind: "field", label: `${label}:`, lines, y });
      y += lines.length * LINE_HEIGHT + FIELD_GAP;
    };

    const title =
      cleanValue(node?.name) ||
      cleanValue(record?.Weapon) ||
      cleanValue(data?.name) ||
      "(unknown)";
    ctx.font = TITLE_FONT;
    const titleLines = wrapText(ctx, title, maxWidth, 2);
    items.push({
      kind: "lines",
      font: TITLE_FONT,
      color: "#000000",
      lines: titleLines,
      y,
      lineHeight: TITLE_LINE_HEIGHT,
    });
    y += titleLines.length * TITLE_LINE_HEIGHT;

    const metaParts = [
      cleanValue(node?.year),
      cleanValue(node?.currentStatus),
    ].filter(Boolean);
    if (metaParts.length) {
      items.push({
        kind: "lines",
        font: META_FONT,
        color: "#555555",
        lines: [metaParts.join("  ·  ")],
        y,
        lineHeight: LINE_HEIGHT,
      });
      y += LINE_HEIGHT;
    }
    y += 6;
    items.push({ kind: "rule", y });
    y += 14;

    if (node) {
      for (const [key, label] of NODE_FIELDS) {
        pushField(label, cleanValue(node[key]));
      }
    }

    if (record) {
      const sectionIndex = items.length;
      const sectionY = y;
      y += 8;
      items.push({ kind: "section", text: "AI WAR CLOUD DATABASE", y });
      y += 26;
      const developed = cleanValue(record.Developed);
      if (developed && developed !== cleanValue(node?.year)) {
        pushField("Developed", developed);
      }
      for (const [key, label] of RECORD_FIELDS) {
        pushField(label, cleanValue(record[key]));
      }
      const source = cleanValue(record.Source);
      const sourceType = cleanValue(record.SourceType);
      pushField(
        "Source",
        source && sourceType ? `${source} (${sourceType})` : source || sourceType
      );
      // Drop the section header if every record field was empty or got
      // skipped by the overflow guard
      if (!items.slice(sectionIndex + 1).some((i) => i.kind === "field")) {
        items.length = sectionIndex;
        y = sectionY;
      }
    }

    const connections = Array.isArray(data?.connections)
      ? data.connections
      : null;
    if (connections?.length) {
      const sectionIndex = items.length;
      const sectionY = y;
      y += 8;
      items.push({ kind: "section", text: "CONNECTIONS", y });
      y += 26;
      for (const group of connections) {
        pushField(group.label, group.names.join(", "));
      }
      if (!items.slice(sectionIndex + 1).some((i) => i.kind === "field")) {
        items.length = sectionIndex;
        y = sectionY;
      }
    }

    if (items.every((item) => item.kind !== "field")) {
      pushField("Info", "(no data)");
    }

    const height = Math.min(
      MAX_CANVAS_HEIGHT,
      Math.max(MIN_CANVAS_HEIGHT, y - FIELD_GAP + PADDING)
    );
    return { items, height };
  }

  _draw(layout) {
    const { ctx, canvas } = this;
    const heightChanged = canvas.height !== layout.height;
    canvas.height = layout.height;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, CANVAS_WIDTH, layout.height);
    ctx.textBaseline = "top";

    for (const item of layout.items) {
      if (item.kind === "lines") {
        ctx.font = item.font;
        ctx.fillStyle = item.color;
        item.lines.forEach((line, i) => {
          ctx.fillText(line, PADDING, item.y + i * item.lineHeight);
        });
      } else if (item.kind === "rule") {
        ctx.beginPath();
        ctx.moveTo(PADDING, item.y);
        ctx.lineTo(CANVAS_WIDTH - PADDING, item.y);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.stroke();
      } else if (item.kind === "section") {
        ctx.font = SECTION_FONT;
        ctx.fillStyle = "#666666";
        ctx.fillText(item.text, PADDING, item.y);
      } else if (item.kind === "field") {
        ctx.font = LABEL_FONT;
        ctx.fillStyle = "#000000";
        ctx.fillText(item.label, PADDING, item.y);
        ctx.font = BODY_FONT;
        item.lines.forEach((line, i) => {
          ctx.fillText(line, PADDING + LABEL_COLUMN, item.y + i * LINE_HEIGHT);
        });
      }
    }

    if (heightChanged) {
      // WebGL2 texture storage is immutable (texStorage2D), so a resized
      // canvas needs a fresh texture rather than a needsUpdate re-upload
      this.texture.dispose();
      this.texture = new THREE.CanvasTexture(canvas);
      this.texture.minFilter = THREE.LinearFilter;
      this.texture.generateMipmaps = false;
      this.mesh.material.map = this.texture;
    } else {
      this.texture.needsUpdate = true;
    }

    const planeHeight = PLANE_WIDTH * (layout.height / CANVAS_WIDTH);
    if (Math.abs(planeHeight - this._planeHeight) > 1e-4) {
      this.mesh.geometry.dispose();
      this.mesh.geometry = new THREE.PlaneGeometry(PLANE_WIDTH, planeHeight);
      this._planeHeight = planeHeight;
    }
  }

  showAt(worldPos) {
    this.mesh.position.copy(worldPos);
    this.mesh.position.y += this._planeHeight / 2 + 0.1;
    this.mesh.visible = true;
  }

  hide() {
    this.mesh.visible = false;
  }
}
