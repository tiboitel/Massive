class Starfield {
  constructor(scene, density, starSpeed, maxStarSize, depth) {
    this.scene = scene;
    this.density = density;
    this.starSpeed = starSpeed;
    this.maxStarSize = maxStarSize;
    this.depth = depth;
    this.stars = this.createStarfield();
  }

  update() {
    const height = this.scene.sys.game.config.height;
    const width = this.scene.sys.game.config.width;

    this.stars.forEach(star => {
      star.y += (star.speed * 100) / 1000;

      if (star.y >= height) {
        star.y = 0;
        star.x = Phaser.Math.Between(0, width);
        star.setRandomColor();
      }

      // Redraw the star graphics
      star.clear();
      star.setRandomColor();
    });
  }

  createStar(x, y) {
    const size = Phaser.Math.Between(1, this.maxStarSize);
    const star = this.scene.add.graphics();
    star.x = x;
    star.y = y;
    star.depth = this.depth;

    star.setRandomColor = function() {
      const hex = Phaser.Math.RND.integerInRange(0x37E2D5, 0xFBCB0A);
      star.fillStyle(hex, 1);
      star.fillRect(-size / 2, -size / 4, size, size / 2);
      star.fillRect(-size / 4, -size / 2, size / 2, size);
    };

    // Initial draw
    star.setRandomColor();
    star.speed = this.starSpeed * size;
    return star;
  }

  createStarfield() {
    const stars = [];
    const height = this.scene.sys.game.config.height;
    const width = this.scene.sys.game.config.width;

    for (let y = 0; y < height; y += 20) {
      const rowCount = Phaser.Math.Between(this.density / 2, this.density * 2);
      for (let i = 0; i < rowCount; i++) {
        const x = Phaser.Math.Between(0, width);
        const star = this.createStar(x, y);
        stars.push(star);
      }
    }

    return stars;
  }
}

export default Starfield;

