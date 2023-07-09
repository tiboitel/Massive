class Spaceship extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'spaceship');
    
    this.speed = 256;
    this.isFiring = false;
    this.fireRate = 32;
    this.tick = 0;
    this.lasers = [];
    this.scene = scene;
    this.laserUpgrade = 0;
    this.lastFrameTimespan = 0;

    // Scale the container to the desired size
    this.setScale(0.4);

    // Enable physics.
    scene.physics.world.enable(this);
    this.setCollideWorldBounds = true;
    this.body.onCollide = true;

    this.body.onWorldBounds = true;
    
    // Set depth to 3. 
    this.setDepth(3);
  }

  update() {
        // If isFiring is true, create a new projectile.
        this.shoot();

        // Update tick.
        if (this.tick > 3600) {
          this.tick = 0;
        }

        // Remove lasers out of screen.
        if (this.ticks % 24 == 0) {
          for (let i = 0; i < this.lasers.length; i++) {
            if (this.lasers[i].y < 0 || this.lasers[i].y > this.scene.game.config.height)
              this.lasers[i].destroy();
            if (this.lasers[i].active === false)
              this.lasers.splice(i, 1);
          }
        }

        // this.body.setVelocityY(0);
        this.tick++;
    }

    shoot() {
        if (this.isFiring && Math.floor(this.tick % this.fireRate) === 0) {
          if (this.laserUpgrade == 0 ) {
            this.lasers.push(new Projectile(this.scene, this.x, this.y - 35));  
          } else if (this.laserUpgrade == 1) {
            this.lasers.push(new Projectile(this.scene, this.x - 20, this.y - 25));  
            this.lasers.push(new Projectile(this.scene, this.x + 20, this.y - 25));  
          } else {
            this.lasers.push(new Projectile(this.scene, this.x - 20, this.y - 25));  
            this.lasers.push(new Projectile(this.scene, this.x + 20, this.y - 25));
            this.lasers.push(new Projectile(this.scene, this.x, this.y - 35));   
          }

          for (let i = 0; i < this.scene.enemy.length; i++) {
            for (let j = 0; j < this.lasers.length; j++) {
              this.scene.physics.add.collider(this.lasers[j], this.scene.enemy[i], this.lasers[j].onCollision);
            }
          }
        }
      }
      
}

