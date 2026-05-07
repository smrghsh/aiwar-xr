import * as THREE from "three";
import Experience from "../Experience.js";

const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 512;
const PLANE_HEIGHT = 0.4;
const TITLE_FONT = "bold 32px ui-monospace, Menlo, Consolas, monospace";
const LABEL_FONT = "bold 18px ui-monospace, Menlo, Consolas, monospace";
const BODY_FONT = "18px ui-monospace, Menlo, Consolas, monospace";
const PADDING = 24;
const LINE_HEIGHT = 24;

const FIELDS = [
  ["Developed", "Developed"],
  ["Used By", "Used By"],
  ["Military Purpose", "Military Purpose"],
  ["Type of Tech", "Type of Tech"],
  ["Repurpose (Potential/Actual)", "Repurpose"],
  ["Source", "Source"],
  ["SourceType", "Source Type"],
];

function stripHtml(value) {
  if (value === undefined || value === null) return "";
  return String(value).replace(/<[^>]*>/g, "").trim();
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? current + " " + word : word;
    if (ctx.measureText(candidate).width <= maxWidth) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
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
    this.canvas.height = CANVAS_HEIGHT;
    this.ctx = this.canvas.getContext("2d");

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.minFilter = THREE.LinearFilter;

    const aspect = CANVAS_WIDTH / CANVAS_HEIGHT;
    const geometry = new THREE.PlaneGeometry(
      PLANE_HEIGHT * aspect,
      PLANE_HEIGHT
    );
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
    this._drawPlaceholder();
  }

  _drawPlaceholder() {
    const { ctx } = this;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = "#000000";
    ctx.font = BODY_FONT;
    ctx.textBaseline = "top";
    ctx.fillText("(no data)", PADDING, PADDING);
    this.texture.needsUpdate = true;
  }

  render(record, key) {
    if (this._currentKey !== key) {
      this._drawRecord(record);
      this._currentKey = key;
    }
    this.mesh.visible = true;
  }

  _drawRecord(record) {
    const { ctx } = this;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = "#000000";
    ctx.textBaseline = "top";

    const maxWidth = CANVAS_WIDTH - PADDING * 2;
    let y = PADDING;

    const title = stripHtml(record?.Weapon) || "(unknown)";
    ctx.font = TITLE_FONT;
    ctx.fillText(title, PADDING, y);
    y += 44;

    ctx.beginPath();
    ctx.moveTo(PADDING, y);
    ctx.lineTo(CANVAS_WIDTH - PADDING, y);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    ctx.stroke();
    y += 12;

    for (const [colKey, label] of FIELDS) {
      const raw = stripHtml(record?.[colKey]);
      if (!raw) continue;
      ctx.font = LABEL_FONT;
      const labelText = `${label}:`;
      const labelWidth = ctx.measureText(labelText).width + 8;
      ctx.fillText(labelText, PADDING, y);

      ctx.font = BODY_FONT;
      const lines = wrapText(ctx, raw, maxWidth - labelWidth);
      lines.forEach((line, i) => {
        ctx.fillText(line, PADDING + labelWidth, y + i * LINE_HEIGHT);
      });
      y += Math.max(LINE_HEIGHT, lines.length * LINE_HEIGHT) + 4;
      if (y > CANVAS_HEIGHT - PADDING) break;
    }

    this.texture.needsUpdate = true;
  }

  showAt(worldPos) {
    this.mesh.position.copy(worldPos);
    this.mesh.position.y += 0.18;
    this.mesh.visible = true;
  }

  hide() {
    this.mesh.visible = false;
  }
}
