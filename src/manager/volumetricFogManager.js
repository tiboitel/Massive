import VolumetricFog from "../gameobjects/fog/volumetricFog.js";
import ColorsHelper from "../utils/colorsHelper.js";

export class VolumetricFogManager {
  constructor(scene, colorscheme) {
    this.scene = scene;
    this.colorscheme = colorscheme;
    this.colorsHelper = new ColorsHelper();

    const width = scene.sys.game.config.width;
    const height = scene.sys.game.config.height;

    const spriteName = "volumetricfog" + Phaser.Math.Between(1, 3);
    const color = colorscheme[0];

    this.fog1 = new VolumetricFog(scene, 0, 0, width, height, spriteName, color);
    this.fog2 = new VolumetricFog(scene, 0, -height, width, height, spriteName, color);
  }

  update(temperature) {
    const colorschemeIndex = Math.floor(temperature * 4) % 4;
    const nextColorIndex = (colorschemeIndex + 1) % this.colorscheme.length;
    const currentColor = this.colorsHelper.getColorGradient(
      temperature,
      this.colorscheme[colorschemeIndex],
      this.colorscheme[nextColorIndex]
    );

    this.fog1.color = currentColor;
    this.fog2.color = currentColor;

    this.fog1.update();
    this.fog2.update();
  }
}

export default VolumetricFogManager;
