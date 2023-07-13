class GameScene extends Phaser.Scene {

    constructor() {
        super('game');
        this.elapsedTime = 0;
        this.enemy = [];
        this.projectileUpgrade = null;
        this.shieldUpgrade = null;
        this.storyteller = new Storyteller();
        this.colorsHelper = new ColorsHelper();
    }
    
    preload() {
        // Load any necessary assets here
        this.load.image('volumetricfog1', 'assets/fog320x480.png');
        this.load.image('volumetricfog2', 'assets/fogb320x480.png');
        this.load.image('volumetricfog3', 'assets/fogc320x480.png');
        this.load.image('spaceship', 'assets/spaceship.png');
        this.load.image('enemy1', 'assets/enemy1.png');
        this.load.image('projectile', 'assets/laser.png');
        this.load.image('energyshield', 'assets/energy_shield.png');  
        this.load.image('laserup', 'assets/laserup.png');
        this.load.image('shieldup', 'assets/shieldup.png');
    }

    create() {
        // Camera controls
        this.cameras.main.setBackgroundColor('#000000');
        this.cameras.main.setBounds(0, 0, this.sys.game.config.width, this.sys.config.height);

        // Colorscheme: Cyan, Violet, Magenta, Yellow
        this.colorscheme =  [0x37E2D5, 0xC70A80, 0x590696, 0xFBCB0A];

        // Starfield
        this.starfield = new Starfield(this, 2, 0.6, 2, 0);

        // Space ship
        this.spaceship = new Spaceship(this, this.sys.game.config.width / 2 + 16, this.sys.game.config.height - 64);
        this.spaceship.body.setCollideWorldBounds(true);

        this.add.existing(this.spaceship);
        //this.cameras.main.startFollow(this.spaceship, true, 0.5, 0.5);
        this.keyboardController = new KeyboardController(this, this.spaceship);

        // Volumetric Fog
        const vFogColor = this.colorscheme[0];
        const vFogSpriteName = "volumetricfog" + Phaser.Math.Between(1, 3);
        
        this.volumetricFog = new VolumetricFog(this, 0, 0, game.config.width, game.config.height, vFogSpriteName, vFogColor);
        this.volumetricFog2 = new VolumetricFog(this, 0, 0 - game.config.height, game.config.width, game.config.height, vFogSpriteName, vFogColor);
    
        // Layer Fog
        this.layerFog = new LayerFog(this, 0, 0, game.config.width, game.config.height, this.colorscheme[0]);
    }

    update(time, delta) {
        // Player
        this.spaceship.update();

        // Starfield
        this.starfield.update();

        // Volumetric fog.
        let colorschemeIndex = Math.floor((this.storyteller.temperature) * 4) %  4;
        let nextGradientColor = (colorschemeIndex + 1) > this.colorscheme.length ? this.colorscheme.length : colorschemeIndex + 1;
        let currentColor = this.colorsHelper.getColorGradient(this.storyteller.temperature, this.colorscheme[colorschemeIndex], this.colorscheme[colorschemeIndex + 1]);

        this.volumetricFog.color = currentColor;
        this.volumetricFog2.color = currentColor;

        this.volumetricFog.update();
        this.volumetricFog2.update();
        
        // Layer fog
        this.layerFog.update();

        // Create a new projectile upgrade every n frames.
        let roll = Phaser.Math.FloatBetween(0, 1);

        if (roll <= this.storyteller.temperature && this.elapsedTime % 3 == 0) {
            let boostType = Phaser.Math.Between(0, 1);
            if (boostType) {
                this.projectileUpgrade = new ProjectileUpgrade(this, Phaser.Math.Between(16, game.config.width - 16), -32);
                this.physics.add.collider(this.projectileUpgrade, this.spaceship, this.projectileUpgrade.onCollision);
            } else {
                this.shieldUpgrade = new ShieldUpgrade(this, Phaser.Math.Between(16, game.config.width - 16), -32);
                this.physics.add.collider(this.shieldUpgrade, this.spaceship, this.shieldUpgrade.onCollision);
            }
        }

        // Create enemies every n frames.
        if (roll + -0.10 <= this.storyteller.temperature && this.elapsedTime % 12 == 0) {
            // Setup a new enemy wave.
            let enemiesCount = Math.floor(Phaser.Math.Between(4, 8) * this.storyteller.temperature) + 1;
            let wave = new Wave(this, enemiesCount);
            let wavePattern = new WavePatterns(48, 8, 0);

            wavePattern.applyWavePatterns(wave, 0);       
        }
        
        // Need to create a garbage-collector to destroy units who get out of screen or get beam
        // by the player.
        if (this.elapsedTime % 2 == 0) {
            for (let i = 0; i < this.enemy.length; i++) {
                if (this.enemy[i].y >= game.config.height) 
                    this.enemy[i].destroy();   

                if (this.enemy[i].active === false)
                    this.enemy.splice(i, 1);
                    this.storyteller.temperature -= 0.025;
                    if (this.storyteller.temperature < 0)
                        this.storyteller.temperature = 0;
            }

            if (this.projectileUpgrade != null && this.projectileUpgrade    .y > game.config.height)
                this.projectileUpgrade.destroy();
        }
        this.storyteller.update(this.elapsedTime);
        this.elapsedTime += Math.ceil(delta);
    }
} 