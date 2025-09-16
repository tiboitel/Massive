class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'enemy1');
  
      // Add this projectile to the scene
      scene.add.existing(this);
  
      // Enable physics on the projectile
      scene.physics.world.enable(this);
  
      // Set up initial velocity for the enemy.
      this.body.setVelocityX(0);
      this.body.setVelocityY(256);

      // Set depth to 3. 
      this.setDepth(3);
      this.setScale(1.4);

      this.body.onCollide = true;
    }

    onCollision(enemy, spaceship) {
        enemy.destroy();
        if (spaceship.shield != null) {
          spaceship.shield.destroy();
          spaceship.shield = null;
        }
        else if (spaceship.laserUpgrade > 0) {
          spaceship.laserUpgrade--;
        }
        spaceship.body.setVelocityY(0);
    }
}

export default Enemy;
