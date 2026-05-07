import * as THREE from "three";
import {
  Debug,
  Sizes,
  Time,
  Resources,
  EventEmitter,
  Controller,
} from "./brahma/Brahma.js";
import Mouse from "./Utils/Mouse.js";
import Camera from "./Camera.js";
import Renderer from "./Renderer.js";
import World from "./World/World.js";
import sources from "./sources.js";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import StatsPanels from "./Utils/StatsPanels.js";

let instance = null;

export default class Experience {
  constructor(canvas) {
    if (instance) {
      return instance;
    }
    instance = this;
    window.experience = this;
    this.canvas = canvas;
    this.emitter = new EventEmitter();
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.resources = new Resources(sources);

    // Brahma's Controller talks to experience.pointer; provide a no-op stub
    // until we wire a real pointer/raycaster.
    this.pointer = {
      setSource: () => {},
      hover: () => {},
      select: () => {},
    };

    this.cameraGroup = new THREE.Group();
    this.scene.add(this.cameraGroup);
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.mouse = new Mouse();
    this.debug = new Debug();
    this.world = new World();
    this.statsPanels = new StatsPanels();

    if (this.debug.active) {
      this.debug.ui.close();
    }

    this.clock = new THREE.Clock();
    this.clock.start();

    this.renderer.instance.xr.enabled = true;

    const sessionInit = {
      optionalFeatures: ["hand-tracking"],
    };

    document.body.appendChild(
      VRButton.createButton(this.renderer.instance, sessionInit)
    );

    this.controller = new Controller();

    this.raycaster = new THREE.Raycaster();
    this._rayMatrix = new THREE.Matrix4();
    this._rayOrigin = new THREE.Vector3();
    this._rayDir = new THREE.Vector3();
    this._nodeWorldPos = new THREE.Vector3();
    this.INTERSECTED = null;

    this.renderer.instance.setAnimationLoop(() => {
      this.statsPanels.begin();
      this.world.update();
      this.controller.update();

      if (window.updateNetworkVisualization) {
        window.updateNetworkVisualization();
      }

      this.updateTooltipRaycast();

      this.renderer.instance.render(this.scene, this.camera.instance);
      this.statsPanels.end();
    });

    this.sizes.on("resize", () => {
      this.resize();
      this.camera.resize();
      this.renderer.resize();
    });
  }

  isXRActive() {
    return this.renderer.instance.xr.isPresenting;
  }

  updateTooltipRaycast() {
    const tooltip = this.world?.tooltip;
    const networkGroup = window.networkGroup;
    if (!tooltip || !networkGroup) return;

    let didCast = false;
    if (this.isXRActive()) {
      const xrController =
        this.controller?.rightController || this.controller?.controller1;
      if (xrController) {
        this._rayMatrix.identity().extractRotation(xrController.matrixWorld);
        this._rayOrigin.setFromMatrixPosition(xrController.matrixWorld);
        this._rayDir.set(0, 0, -1).applyMatrix4(this._rayMatrix);
        this.raycaster.set(this._rayOrigin, this._rayDir);
        didCast = true;
      }
    } else if (this.mouse) {
      this.raycaster.setFromCamera(this.mouse, this.camera.instance);
      didCast = true;
    }
    if (!didCast) return;

    let nodeHit = null;

    const hits = this.raycaster.intersectObject(networkGroup, true);
    if (hits.length > 0) {
      let n = hits[0].object;
      while (n && !n.userData?.networkNode && n.parent) n = n.parent;
      if (n && n.userData?.networkNode) nodeHit = n;
    }

    if (!nodeHit) {
      const ray = this.raycaster.ray;
      const angularThreshold = Math.tan(THREE.MathUtils.degToRad(0.7));
      let bestDist = Infinity;
      const tmp = this._nodeWorldPos;
      networkGroup.traverse((obj) => {
        if (!obj.userData?.networkNode) return;
        obj.getWorldPosition(tmp);
        const toPoint = tmp.clone().sub(ray.origin);
        const t = toPoint.dot(ray.direction);
        if (t <= 0) return;
        const closest = ray.origin
          .clone()
          .add(ray.direction.clone().multiplyScalar(t));
        const perpDist = closest.distanceTo(tmp);
        if (perpDist < angularThreshold * t && perpDist < bestDist) {
          bestDist = perpDist;
          nodeHit = obj;
        }
      });
    }

    if (!nodeHit) {
      tooltip.hide();
      return;
    }
    nodeHit.getWorldPosition(this._nodeWorldPos);
    tooltip.showAt(this._nodeWorldPos);
  }

  resize() {
    this.camera.resize();
  }

  update() {}

  destroy() {
    this.sizes.off("resize");
    this.time.off("tick");

    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        for (const key in child.material) {
          const value = child.material[key];
          if (value && typeof value.dispose === "function") {
            value.dispose();
          }
        }
      }
    });
    this.camera.controls.dispose();
    this.renderer.instance.dispose();
    if (this.debug.active) {
      this.debug.ui.destroy();
    }
  }
}
