import * as THREE from "three";
import Experience from "../Experience.js";

const LOREM = [
  "Lorem ipsum dolor sit amet,",
  "consectetur adipiscing elit,",
  "sed do eiusmod tempor incididunt",
  "ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis",
  "nostrud exercitation ullamco",
  "laboris nisi ut aliquip ex ea",
  "commodo consequat.",
];

export default class Tooltip {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000000";
    ctx.font = "20px ui-monospace, Menlo, Consolas, monospace";
    ctx.textBaseline = "top";
    const padding = 16;
    const lineHeight = 26;
    LOREM.forEach((line, i) => {
      ctx.fillText(line, padding, padding + i * lineHeight);
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.needsUpdate = true;

    const aspect = canvas.width / canvas.height;
    const height = 0.4;
    const geometry = new THREE.PlaneGeometry(height * aspect, height);
    const material = new THREE.MeshBasicMaterial({
      map: texture,
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
