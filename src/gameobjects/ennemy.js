class Ennemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'ennemy1');
  
      // Add this projectile to the scene
      scene.add.existing(this);
  
      // Enable physics on the projectile
      scene.physics.world.enable(this);
  
      // Set up initial velocity for the ennemy.
      this.body.setVelocityX(0);
      this.body.setVelocityY(96);

      // Set depth to 3. 
      this.setDepth(3);
      this.setScale(1.4);

      this.body.onCollide = true;
    }

    onCollision(ennemy, spaceship) {
        ennemy.destroy();
        if (spaceship.laserUpgrade > 0) {
          spaceship.laserUpgrade--;
        }
        spaceship.body.setVelocityY(0);
    }
}