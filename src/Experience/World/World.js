import * as THREE from "three";
import Papa from "papaparse";
import Experience from "../Experience.js";
import Environment from "./Environment.js";
import Floor from "./Floor.js";
import Tooltip from "./Tooltip.js";
import { buildRecordIndex, findRecord } from "./recordIndex.js";

const CSV_PATH = "./data/aiwarcloud-table.csv";

// Edge labels are active voice: "source <label> target" (e.g. Niantic
// -developed-> LargeGeospatialModels). Display phrasing per direction:
const OUTGOING_LABELS = {
  developed: "Developed",
  employed: "Employs",
  "proposed relationship": "Proposed use of",
  CEO: "CEO of",
  founder: "Founder of",
  employee: "Employee of",
  investor: "Investor in",
  owner: "Owner of",
  "prospective owner": "Prospective owner of",
  "former partner": "Former partner of",
  "unit vetran": "Unit veteran of",
};
const INCOMING_LABELS = {
  developed: "Developed by",
  employed: "Employed by",
  "proposed relationship": "Proposed use by",
  "used in": "Deployment site of",
  "based in": "Home of",
  CEO: "CEO",
  founder: "Founded by",
  employee: "Employees",
  investor: "Investors",
  owner: "Owned by",
  "prospective owner": "Prospective owner",
  "former partner": "Former partner",
  "unit vetran": "Unit veterans",
  owns: "Owned by",
  "invested in": "Investment from",
  "invests in": "Investment from",
  "part of": "Includes",
  "member of": "Members",
  purchased: "Purchased by",
  "sold to": "Acquired",
  contracts: "Contracted by",
  incorporates: "Incorporated into",
  "based on": "Basis of",
  "relies on": "Relied on by",
  "provides data to": "Data from",
  "partners with": "Partners with",
  affiliated: "Affiliated",
  similar: "Similar",
};
const MAX_CONNECTION_NAMES = 8;

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default class World {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;
    this.debugFolder = this.debug.ui.addFolder("world");

    // Network visualization controls
    this.networkPosition = {
      x: 0,
      y: 1.6,
      z: -3,
    };
    this.networkRotation = {
      x: 0,
      // x: 0,
      y: 0,
      z: 0,
      // z: -1.5,
    };

    this.networkScale = { x: 0.015, y: 0.015, z: 0.015 };

    // Add network position controls
    this.debugFolder
      .add(this.networkPosition, "x", -10, 10, 0.1)
      .name("Network X")
      .onChange(() => {
        this.updateNetworkTransform();
      });
    this.debugFolder
      .add(this.networkPosition, "y", -5, 10, 0.1)
      .name("Network Y")
      .onChange(() => {
        this.updateNetworkTransform();
      });
    this.debugFolder
      .add(this.networkPosition, "z", -100, 10, 0.1)
      .name("Network Z")
      .onChange(() => {
        this.updateNetworkTransform();
      });
    // same for rotation
    this.debugFolder
      .add(this.networkRotation, "x", -Math.PI, Math.PI, 0.01)
      .name("Network Rotation X")
      .onChange(() => {
        this.updateNetworkTransform();
      });
    this.debugFolder
      .add(this.networkRotation, "y", -Math.PI, Math.PI, 0.01)
      .name("Network Rotation Y")
      .onChange(() => {
        this.updateNetworkTransform();
      });
    this.debugFolder
      .add(this.networkRotation, "z", -Math.PI, Math.PI, 0.01)
      .name("Network Rotation Z")
      .onChange(() => {
        this.updateNetworkTransform();
      });

    // Add network scale controls
    // this.debugFolder
    //   .add(this.networkScale, "x", 0.001, 0.1, 0.001)
    //   .name("Network Scale X")
    //   .onChange(() => {
    //     this.updateNetworkTransform();
    //   });
    // this.debugFolder
    //   .add(this.networkScale, "y", 0.001, 0.1, 0.001)
    //   .name("Network Scale Y")
    //   .onChange(() => {
    //     this.updateNetworkTransform();
    //   });
    // this.debugFolder
    //   .add(this.networkScale, "z", 0.001, 0.1, 0.001)
    //   .name("Network Scale Z")
    //   .onChange(() => {
    //     this.updateNetworkTransform();
    //   });

    // Wait for resources
    this.ready = false;
    this.resources.on("ready", () => {
      // Setup
      console.log("resources ready");
      this.floor = new Floor();
      // this.scene.add(new THREE.AxesHelper()); // Add axes helper for debugging
      this.environment = new Environment();
      this.tooltip = new Tooltip();
      this.records = new Map();
      this.loadRecords();
      this.ready = true;

      // place a 16x9 plane on the floor
      const standingFloorGeometry = new THREE.PlaneGeometry(16, 9);
      const standingFloorMaterial = new THREE.MeshBasicMaterial({
        color: 0x808080,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
      });
      this.standingFloor = new THREE.Mesh(
        standingFloorGeometry,
        standingFloorMaterial
      );
      this.standingFloor.rotation.x = -Math.PI / 2; // Rotate to be horizontal
      this.standingFloor.position.y = 0.075; // Slightly above the floor to avoid z-fighting
      this.scene.add(this.standingFloor);

      // place a transclucent 16x9 plane on the wall
      const standingWallGeometry = new THREE.PlaneGeometry(16, 9);
      const standingWallMaterial = new THREE.MeshBasicMaterial({
        color: 0x888000,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
      });
      this.standingWall = new THREE.Mesh(
        standingWallGeometry,
        standingWallMaterial
      );
      this.standingWall.rotation.y = Math.PI / 2; // Rotate to be vertical
      this.standingWall.position.set(0, 4.5, -5); // Position it
      this.scene.add(this.standingWall);
      this.standingWall.rotation.y += Math.PI / 2; // Rotate to face the camera

      // Add visibility toggles to debug UI
      this.debugFolder
        .add(this.standingFloor, "visible")
        .name("Standing Floor Visibility")
        .listen();
      this.standingFloor.visible = false; // Set initial visibility
      this.debugFolder
        .add(this.standingWall, "visible")
        .name("Standing Wall Visibility")
        .listen();
      this.standingWall.visible = false; // Set initial visibility
      this.network = this.getNetworkVisualization();
      // Apply initial network transform if network is available
      if (this.network) {
        this.updateNetworkTransform();
      }
    });
  }

  updateNetworkTransform() {
    if (this.network) {
      this.network.position.set(
        this.networkPosition.x,
        this.networkPosition.y,
        this.networkPosition.z
      );
      this.network.rotation.set(
        this.networkRotation.x,
        this.networkRotation.y,
        this.networkRotation.z
      );
      this.network.scale.set(
        this.networkScale.x,
        this.networkScale.y,
        this.networkScale.z
      );
    }
  }
  getNetworkVisualization() {
    return (
      window.networkGroup || this.scene.getObjectByName("NetworkVisualization")
    );
  }

  async loadRecords() {
    try {
      const response = await fetch(CSV_PATH);
      const text = (await response.text()).replace(/^﻿/, "");
      const parsed = Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
      });
      this.records = buildRecordIndex(parsed.data);
      console.log(`Loaded ${this.records.size} aiwar record keys`);
    } catch (err) {
      console.error("Failed to load aiwar CSV:", err);
    }
  }

  lookupRecord(name, id) {
    return findRecord(this.records, name, id);
  }

  getConnections(id) {
    const graph = window.aiwarGraph;
    if (!id || !graph?.edges?.length || !graph?.nodes?.length) return null;
    if (this._connectionsGraph !== graph) {
      this._connectionsGraph = graph;
      this._connectionsCache = new Map();
      this._nodeNames = new Map(
        graph.nodes.map((node) => [node.id, node.name || node.id])
      );
    }
    if (this._connectionsCache.has(id)) return this._connectionsCache.get(id);

    const idOf = (ref) => (ref && typeof ref === "object" ? ref.id : ref);
    const groups = new Map();
    const addTo = (label, otherId) => {
      if (!groups.has(label)) groups.set(label, new Set());
      groups.get(label).add(this._nodeNames.get(otherId) || otherId);
    };
    for (const edge of graph.edges) {
      const source = idOf(edge.source);
      const target = idOf(edge.target);
      const label = edge.label || "connected to";
      if (source === id) {
        addTo(OUTGOING_LABELS[label] || capitalize(label), target);
      } else if (target === id) {
        addTo(INCOMING_LABELS[label] || `← ${capitalize(label)}`, source);
      }
    }
    const connections = Array.from(groups, ([label, nameSet]) => {
      const names = [...nameSet];
      return {
        label,
        names:
          names.length > MAX_CONNECTION_NAMES
            ? [
                ...names.slice(0, MAX_CONNECTION_NAMES),
                `+${names.length - MAX_CONNECTION_NAMES} more`,
              ]
            : names,
      };
    });
    const result = connections.length ? connections : null;
    this._connectionsCache.set(id, result);
    return result;
  }

  update() {
    if (this.ready) {
      // Get network if we don't have it yet
      if (!this.network) {
        this.network = this.getNetworkVisualization();
        if (this.network) {
          this.updateNetworkTransform();
        }
      }

      if (this.network) {
        // Example: slowly rotate the network
        // this.network.rotation.y += 0.002;
      }
    }
  }
}
