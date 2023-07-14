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
      this.stars.forEach(star => {
        star.y += this.starSpeed * 500 / 1000;
  
        if (star.y >= this.scene.game.config.height) {
          star.y = 0;
          star.x = Phaser.Math.Between(0, this.scene.game.config.width);
          star.setRandomColor();
        }
      });
    }
  
    createStar(x, y) {
      const size = Phaser.Math.Between(1, this.maxStarSize);
      const star = this.scene.add.graphics();
  
      star.x = x;
      star.y = y;
      star.depth = this.depth;
      star.fillStyle(0xffffff);
  
      star.setRandomColor = function() {
        const color = Phaser.Display.Color.HexStringToColor('#' + Phaser.Math.RND.integerInRange(0x37E2D5, 0XFBCB0A).toString(16));
        star.clear();
        star.fillStyle(color.color);
        star.fillRect(-size / 2, -size / 4, size, size / 2);
        star.fillRect(-size / 4, -size / 2, size / 2, size);
      };
  
      star.setRandomColor();
  
      return star;
    }
  
    createStarfield() {
      const stars = [];
  
      for (let y = 0; y < this.scene.sys.game.config.height; y += 20) {
        for (let i = 0; i < Phaser.Math.Between(this.density / 2, this.density * 2); i++) {
          const x = Phaser.Math.Between(0, this.scene.sys.game.config.width);
          const star = this.createStar(x, y);
          stars.push(star);
        }
      }
  
      return stars;
    }
  }
  