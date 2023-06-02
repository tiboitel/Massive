class LayerFog {
    constructor(scene, x, y, width, height, color) {
        this.scene = scene;
        this.speed = 1;
        this.width = width;
        this.height = height;
        this.color = color;
        
        this.fog = scene.add.container();
        for (let i = 0; i < 3; i++) {
            const layer = scene.add.graphics();
            layer.fillStyle(this.color, 0.1);
            layer.fillRect(0, 0, scene.game.config.width, scene.game.config.height);
            this.fog.add(layer);
        }

        this.fog.setAlpha(0.1);
        this.fog.setBlendMode(Phaser.BlendModes.SCREEN);
        this.fog.setDepth(1001);
    }

    update() {
        // Layer fog update.
        for (let i = 0; i < this.fog.list.length; i++) {
            this.fog.list[i].y += i * this.speed * 500 / 1000;
            if (this.fog.list[i].y > this.scene.game.config.height) {
                this.fog.list[i].y = -this.scene.game.config.height;
            }
        }
    }
}