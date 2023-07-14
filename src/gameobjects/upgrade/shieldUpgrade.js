class ShieldUpgrade extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'shieldup');

        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.body.setVelocityX(0);
        this.body.setVelocityY(64);
        this.setDepth(2);
    }

    onCollision(shieldUpgrade, spaceship) {
        if (spaceship.shield == null) {
            spaceship.addShield();
        }
        shieldUpgrade.destroy();
        shieldUpgrade = null;
    }
}