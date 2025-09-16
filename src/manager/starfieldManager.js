import Starfield from "../gameobjects/starfield/starfield.js";

export class StarfieldManager {
  constructor(scene) {
    this.scene = scene;
    this.starfield = new Starfield(scene, 2, 0.6, 2, 0);
  }

  update() {
    this.starfield.update();
  }
}

export default Starfield;
