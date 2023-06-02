class Projectile extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'projectile');
  
      // Add this projectile to the scene
      scene.add.existing(this);
  
      // Enable physics on the projectile
      scene.physics.world.enable(this);
  
      // Set up physics properties for the projectile
  
      // Set up initial velocity for the projectile
      this.body.setVelocityX(0);
      this.body.setVelocityY(-500);

      //this.scale(0.5);
      this.body.onCollide = true;
      this.body.onCollideCallback = this.onCollision.bind(this);

      // Set depth to 3. 
      this.setDepth(3);
    }

    onCollision() {
        console.log("Laser destroyed !");
        this.destroy();
    }
  
    update() {
      // Any update code you need for your projectile goes here
      console.log(this.y);
      console.log(this.body.y);
      if (this.y > 0 || this.y < this.scene.game.config.height)
        console.log("Laser destroyed");
        this.destroy();
    }
  }
  