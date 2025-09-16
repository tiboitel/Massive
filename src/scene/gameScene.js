import Spaceship from "../gameobjects/player/spaceship.js";
// Handles ProjectileUpgrade and ShieldUpgrade spawning and pooling
import KeyboardController from "../controller/keyboardController.js";
import StorytellerManager from "../manager/storytellerManager.js";
import StarfieldManager from "../manager/starfieldManager.js";
import VolumetricFogManager from "../manager/volumetricFogManager.js";
import UpgradeManager from "../manager/upgradeManager.js";
import EnemyManager from "../manager/enemyManager.js";
import ProjectileManager from "../manager/projectileManager.js"

export class GameScene extends Phaser.Scene {
  constructor() {
    super("game");
    this.elapsedTime = 0;
    this.eventsTimer = 0;
  }

  preload() {
    this.load.image('volumetricfog1', 'public/assets/fog320x480.png');
    this.load.image('volumetricfog2', 'public/assets/fogb320x480.png');
    this.load.image('volumetricfog3', 'public/assets/fogc320x480.png');
    this.load.image('spaceship', 'public/assets/spaceship.png');
    this.load.image('enemy1', 'public/assets/enemy1.png');
    this.load.image('projectile', 'public/assets/laser.png');
    this.load.image('energyshield', 'public/assets/energy_shield.png');
    this.load.image('laserup', 'public/assets/laserup.png');
    this.load.image('shieldup', 'public/assets/shieldup.png');
  }

  create() {
    this.colorscheme = [0x37e2d5, 0xfc40ff, 0x590696, 0xfbcb0a];
    this.projectileManager = new ProjectileManager(this);

    this.spaceship = new Spaceship(
      this,
      this.sys.game.config.width / 2 + 16,
      this.sys.game.config.height - 64,
      this.projectileManager
    );
    this.spaceship.body.setCollideWorldBounds(true);
    this.add.existing(this.spaceship);


    this.keyboardController = new KeyboardController(this, this.spaceship);
    this.storyteller = new StorytellerManager();
    this.fogManager = new VolumetricFogManager(this, this.colorscheme);
    this.starfieldManager = new StarfieldManager(this);
    this.upgradeManager = new UpgradeManager(this, this.spaceship);
    this.enemyManager = new EnemyManager(this, this.spaceship); // integrates with Wave system
  }

  update(time, delta) {
    this.spaceship.update();
    this.fogManager.update(this.storyteller.temperature);
    this.starfieldManager.update();

    if (this.eventsTimer + delta >= 2048) {
      // spawn upgrades
      if (this.elapsedTime % Math.ceil(5192 * (1 - this.storyteller.temperature)) < 500) {
        const x = Phaser.Math.Between(16, this.sys.game.config.width - 16);
        this.upgradeManager.spawnRandomUpgrade(x, -32);
      }

      // spawn enemy waves
      this.enemyManager.spawnWave(this.storyteller.temperature);

      this.upgradeManager.update(delta);
      this.enemyManager.cleanup();

      this.storyteller.update(this.elapsedTime);

      this.eventsTimer = 0;
    }

    this.elapsedTime += Math.ceil(delta);
    this.eventsTimer += Math.ceil(delta);
  }
}

export default GameScene;
