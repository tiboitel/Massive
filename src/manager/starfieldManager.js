import Starfield from "../gameobjects/starfield/starfield.js";

export class StarfieldManager {
  constructor(scene) {
    this.scene = scene;
    this.starfield = new Starfield(scene, 3, 0.5, 2.5, 0); // density, speed, maxSize, depth
  }

  update() {
    this.starfield.update();
  }
}

export default StarfieldManager;

