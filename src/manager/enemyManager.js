import WaveFactory from '../gameplay/ennemiesWave/waveFactory.js'
import Enemy from '../gameobjects/enemy/enemy.js';
import { DEFAULT_WAVE_SIZE } from '../config/constants.js';

export default class EnemyManager {
  constructor(scene) {
    this.scene = scene;
    this.group = this.scene.physics.add.group({
      classType: Enemy,
      runChildUpdate: false
    });
  }

  spawn(x, y) {
    let enemy = this.group.get(x, y, 'enemy1');
    if (!enemy) return null;

    enemy.setActive(true).setVisible(true);
    this.scene.physics.world.enable(enemy);
    enemy.body.setVelocityY(128);

    // Collision with player
    this.scene.physics.add.collider(enemy, this.scene.spaceship, (e, ship) => {
      e.setActive(false).setVisible(false);
      if (ship.shield) {
        ship.shield.destroy();
        ship.shield = null;
      } else if (ship.laserUpgrade > 0) {
        ship.laserUpgrade--;
      } else {
        ship.life--;
      }
    });

    return enemy;
  }

  spawnWave(temperature) {
    const enemiesCount = DEFAULT_WAVE_SIZE;
    let pattern = (Math.floor(Math.random() * 2) == 0) ? "line" : "v";
    this.currentWave = WaveFactory.create(this.scene, enemiesCount, pattern);
  }

  cleanup() {
    this.group.children.iterate(enemy => {
      if (enemy.active && enemy.y > this.scene.sys.game.config.height) {
        enemy.setActive(false).setVisible(false);
        enemy.body.stop();
      }
    });
  }
}

