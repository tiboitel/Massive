import Shield from "./shield.js";

class Spaceship extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, projectileManager) {
    super(scene, x, y, 'spaceship');

    this.projectileManager = projectileManager;
    this.speed = 384;
    this.isFiring = false;
    this.fireRate = 32;
    this.tick = 0;
    this.laserUpgrade = 0;
    this.shield = null;
    this.life = 3;

    scene.physics.world.enable(this);
    this.setDepth(3);
    this.setScale(0.33);
  }

  update() {
    this.shoot();
    this.tick++;
    if (this.shield) {
      this.shield.x = this.x;
      this.shield.y = this.y;
    }
  }

  shoot() {
    if (this.isFiring && this.tick % this.fireRate === 0) {
      this.projectileManager.fire(this.x, this.y, this.laserUpgrade);
    }
  }

  addShield() {
    if (!this.shield) {
      this.shield = new Shield(this.scene, this.x, this.y, this);
    }
  }
}

export default Spaceship;

