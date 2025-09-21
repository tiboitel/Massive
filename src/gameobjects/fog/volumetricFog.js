class VolumetricFog {
  constructor(scene, x, y, width, height, spriteName, color) {
    this.spriteName = spriteName;
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.fogImage = this.scene.add.image(x + width / 2, y + height / 2, this.spriteName).setOrigin(0.5);
    this.fogImage.depth = 1000; // Set depth to ensure it's above all other game objects
    this.fogImage.setBlendMode(Phaser.BlendModes.ADD);
    this.fogImage.setTint(color); // Set the tint to the desired color
    this.fogImage.setScale(width / this.fogImage.width, height / this.fogImage.height);
  }

  update() {
    //  Fade the fog in and out using a sine wave
    const camera = this.scene.cameras.main;
    const t = this.scene.time.now / 1000;
    const alpha = 0.05 + (Math.sin(t) * 0.05 + 0.10); // Sine wave from 0 to 1
    const scrollY = camera.scrollY;
    
    this.fogImage.setTint(this.color); // Set the tint to the desired color
    this.fogImage.alpha = alpha;
    this.fogImage.y += 2.5 * 500 / 1000;
    if (this.fogImage.y >= this.height * 1.5)
        this.fogImage.y = 0 - this.height / 2;
  }
}

export default VolumetricFog;
