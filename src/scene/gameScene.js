class GameScene extends Phaser.Scene {

    constructor() {
        super('game');
        this.ticks = 0;
    }
    
    preload() {
        // Load any necessary assets here
        this.load.image('volumetricfog1', 'assets/fog320x480.png');
        this.load.image('volumetricfog2', 'assets/fogb320x480.png');
        this.load.image('volumetricfog3', 'assets/fogc320x480.png');
        this.load.image('spaceship', 'assets/spaceship.png');
        this.load.image('projectile', 'assets/laser.png');  
        this.load.image('laserup', 'assets/laserup.png');
    }

    create() {
        // Camera controls
        this.cameras.main.setBackgroundColor('#000000');
        this.cameras.main.setBounds(0, 0, this.sys.game.config.width, this.sys.config.height);

        // Colorscheme: Cyan, Violet, Magenta, Yellow
        this.colorscheme =  [0x37E2D5, 0x590696, 0xC70A80, 0XFBCB0A];

        // Starfield
        this.starfield = new Starfield(this, 2, 0.6, 2, 0);

        // Space ship
        this.spaceship = new Spaceship(this, this.sys.game.config.width / 2 + 16, this.sys.game.config.height - 64);
        this.spaceship.body.setCollideWorldBounds(true);

        this.add.existing(this.spaceship);
        //this.cameras.main.startFollow(this.spaceship, true, 0.5, 0.5);
        this.keyboardController = new KeyboardController(this, this.spaceship);

        // Volumetric Fog
        const vFogColor = this.colorscheme[Phaser.Math.Between(0, 4)];
        const vFogSpriteName = "volumetricfog" + Phaser.Math.Between(1, 3);
        
        this.volumetricFog = new VolumetricFog(this, 0, 0, game.config.width, game.config.height, vFogSpriteName, vFogColor);
        this.volumetricFog2 = new VolumetricFog(this, 0, 0 - game.config.height, game.config.width, game.config.height, vFogSpriteName, vFogColor);
    
        // Layer Fog
        this.layerFog = new LayerFog(this, 0, 0, game.config.width, game.config.height, this.colorscheme[Phaser.Math.Between(0, 4)]);
    }

    update() {
        // Player
        this.spaceship.update();

        // Starfield
        this.starfield.update();

        // Volumetric fog update.
        this.volumetricFog.update();
        this.volumetricFog2.update();
        
        // Layer fog update.
        this.layerFog.update();

        // Create a new boost every n frames.
        if (this.ticks % 1800 === 0) {
            let boost = new Boost(this, Phaser.Math.Between(16, game.config.width - 16),    -32);
        }
        this.ticks++;
    }
} 