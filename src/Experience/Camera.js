import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Experience from "./Experience.js";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.cameraGroup = this.experience.cameraGroup;
    this.canvas = this.experience.canvas;
    this.setInstance();
    this.setOrbitControls();
    this.defaultPosition();
    this.controls.update();
  }
  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.lookAt = new THREE.Vector3(0, 1, 0);
    this.cameraGroup.add(this.instance);
  }
  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
    this.controls.target = new THREE.Vector3(0, 0.9, 0);
    this.instance.position.set(0, 0.9, 5);
  }
  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }
  update() {
    this.controls.update();
  }
  defaultPosition() {
    this.instance.position.set(3, 3, 5);
    // do this position instead:
    //{ x: 0.6103066489021093, y: 2.552796053365129, z: 17.290198833344668 }

    this.instance.position.set(
      0.6103066489021093,
      2.552796053365129,
      22.290198833344668
    );
    // do rotation
    //  _x: 0.08669778950073397, _y: -0.019886097377199694, _z: 0.001728297762236064

    this.instance.rotation.set(
      0.08669778950073397,
      -0.019886097377199694,
      0.001728297762236064
    );

    // this.lookAt = new THREE.Vector3(0, 1, 0);

    this.controls.target = new THREE.Vector3(0, 3, 0);
  }
  examplePosition() {
    //    this.instance.position.set(0, 0.9, 5);
    this.instance.position.set(-1, 2, 1);
    this.lookAt = new THREE.Vector3(0, 0, 0);

    this.controls.target = new THREE.Vector3(0, 0.0, 0);
  }
}
