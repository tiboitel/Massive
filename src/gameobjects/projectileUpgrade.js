class ProjectileUpgrade extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'laserup');
  
      // Add this projectile to the scene
      scene.add.existing(this);
  
      // Enable physics on the projectile
      scene.physics.world.enable(this);
  
      // Set up physics properties for the projectile
  
      // Set up initial velocity for the projectile
      this.body.setVelocityX(0);
      this.body.setVelocityY(64);

      // Set depth to 3. 
      this.setDepth(2);

      //this.scale(0.5);
      this.body.onCollide = true;
      this.body.onCollideCallback = this.onCollision.bind(this);
    }

    onCollision(projectileUpgrade, spaceship) {
        if (spaceship.laserUpgrade < 3)
          spaceship.laserUpgrade += 1;
        projectileUpgrade.destroy();

    }
  
}