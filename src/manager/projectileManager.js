import { PROJECTILE_SPEED } from '../config/constants'

export default class ProjectileManager {
  constructor(scene) {
    this.scene = scene;
    this.group = this.scene.physics.add.group({
      classType: Phaser.GameObjects.Sprite,
      runChildUpdate: false
    });
  }

  fire(x, y, upgradeLevel = 0) {
    const projectiles = [];

    const fireOne = (offsetX, offsetY) => {
      let projectile = this.group.get(x + offsetX, y + offsetY, 'projectile');
      if (!projectile) return;

      projectile.setActive(true).setVisible(true);
      this.scene.physics.world.enable(projectile);
      projectile.body.setVelocity(0, -PROJECTILE_SPEED);
      projectile.setDepth(2);

      // Collision with enemies
      this.scene.physics.add.collider(projectile, this.scene.enemyManager.group, (proj, enemy) => {
        proj.setActive(false).setVisible(false);
        proj.body.stop();
        proj.body.enable = false;
        enemy.setActive(false).setVisible(false);
      });

      projectiles.push(projectile);
    };

    if (upgradeLevel === 0) {
      fireOne(0, -35);
    } else if (upgradeLevel === 1) {
      fireOne(-20, -25);
      fireOne(20, -25);
    } else {
      fireOne(-20, -25);
      fireOne(20, -25);
      fireOne(0, -35);
    }

    return projectiles;
  }

  cleanup() {
    this.group.children.iterate(p => {
      if (p.active && p.y < 0) {
        p.setActive(false).setVisible(false);
        p.body.stop();
        p.body.enable = false;
      }
    });
  }
}

