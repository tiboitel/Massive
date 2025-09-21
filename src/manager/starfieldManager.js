import Starfield from "../gameobjects/starfield/starfield.js";
import { 
  STARFIELD_DENSITY,
  STARFIELD_SPEED,
  MAX_STAR_SIZE 
} from "../config/constants.js";

export class StarfieldManager {
  constructor(scene) {
    this.scene = scene;
    this.starfield = new Starfield(scene, STARFIELD_DENSITY, STARFIELD_SPEED, MAX_STAR_SIZE, -1);
  }

  update() {
    this.starfield.update();
  }
}

export default StarfieldManager;

