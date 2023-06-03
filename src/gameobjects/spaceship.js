class Spaceship extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'spaceship');
    
    this.speedX = 0;
    this.speedY = 0;
    this.speed = 4;
    this.isFiring = false;
    this.fireRate = 32;
    this.tick = 0;

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
        this.x += this.speedX;
        this.y += this.speedY;

        // If isFiring is true, create a new projectile.
        if (this.isFiring && Math.floor(this.tick % this.fireRate) === 0) {
          this.laser = new Projectile(this.scene, this.x, this.y - 45);
        }

        // Update tick.
        if (this.tick > 3600) {
          this.tick = 0;
        }
        this.tick++;
    }
}

