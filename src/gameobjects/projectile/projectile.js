class Projectile extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'projectile');
  
      // Add this projectile to the scene
      scene.add.existing(this);
  
      // Enable physics on the projectile
      scene.physics.world.enable(this);
  
      // Set up initial velocity for the projectile
      this.body.setVelocityX(0);
      this.body.setVelocityY(-500);

      //this.scale(0.5);
      this.body.onCollide = true;

      // Set depth to 3. 
      this.setDepth(2);
    }

    onCollision(projectile, object) {
        projectile.destroy();
        object.destroy();
  }
}
  