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

    this.renderer.instance.setAnimationLoop(() => {
      this.statsPanels.begin();
      this.world.update();
      this.controller.update();

      if (window.updateNetworkVisualization) {
        window.updateNetworkVisualization();
      }

      this.renderer.instance.render(this.scene, this.camera.instance);
      this.statsPanels.end();
    });

    this.raycaster = new THREE.Raycaster();
    this.INTERSECTED = null;

    this.sizes.on("resize", () => {
      this.resize();
      this.camera.resize();
      this.renderer.resize();
    });
  }

  isXRActive() {
    return this.renderer.instance.xr.isPresenting;
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
