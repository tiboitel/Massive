class Shield extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, spaceship) {
        super(scene, x, y, 'energyshield');
        this.spaceship = spaceship;
        this.setDepth(4);
        this.setScale(0.9);
        this.setAlpha(0.3);
        this.setBlendMode(Phaser.BlendModes.LIGHTER);
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        scene.add.existing(this);
    }
}