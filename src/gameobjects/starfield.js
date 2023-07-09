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
        const stars = this.stars.getChildren();

         // Starfield update.
        for (let i = 0; i < stars.length; i++) {
            const star = stars[i];

            // Scroll the star down by STAR_SPEED
            star.y += this.starSpeed * 500 / 1000;

            // If the star goes below the screen, reset its position to the top
            if (star.y >= this.scene.game.config.height) {
                star.y = 0;
                star.update();
            }
        }
    }

    createStar(x, y) {
        const size = Phaser.Math.Between(1, this.maxStarSize);
        const color = Phaser.Display.Color.HexStringToColor('#' + Phaser.Math.RND.integerInRange(0x37E2D5, 0XFBCB0A).toString(16));
        const alpha = Phaser.Math.FloatBetween(0.2, 0.8);
        const shape = Phaser.Math.Between(0, 1); // 0 = cross, 1 = circle
        const star = this.scene.add.graphics();

        star.fillStyle(color.color, alpha);
        if (shape === 0) {
            star.fillRect(x - size / 2, y - size / 4, size, size / 2);
            star.fillRect(x - size / 4, y - size / 2, size / 2, size);
        } else {
            star.fillCircle(x, y, size);
        }

        return star;
    }

    createStarfield() {
        const stars = this.scene.add.group();

        for (let y = 0; y < this.scene.sys.game.config.height; y += 20) {
            for (let i = 0; i < Phaser.Math.Between(this.density / 2, this.density * 2); i++) {
                const x = Phaser.Math.Between(0, this.scene.sys.game.config.width);
                const star = this.createStar.call(this, x, y);
                star.setDepth(this.depth);
                stars.add(star);
            }
        }

        return stars;
    }
}