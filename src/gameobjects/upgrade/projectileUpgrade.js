class ProjectileUpgrade extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'laserup');
  
      scene.add.existing(this);
      scene.physics.world.enable(this);
      
      this.body.setVelocityX(0);
      this.body.setVelocityY(64);
      this.setDepth(2);
      this.body.onCollide = true;
    }

    onCollision(projectileUpgrade, spaceship) {
        if (spaceship.laserUpgrade < 3) {
          spaceship.laserUpgrade += 1;
        }
        projectileUpgrade.destroy();
    }
}

export default ProjectileUpgrade;
