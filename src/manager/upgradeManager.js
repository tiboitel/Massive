import ProjectileUpgrade from "../gameobjects/upgrade/projectileUpgrade.js";
import ShieldUpgrade from "../gameobjects/upgrade/shieldUpgrade.js";

export class UpgradeManager {
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;

    this.projectiles = [];
    this.shields = [];
  }

  spawnRandomUpgrade(x, y) {
    if (this.player.laserUpgrade < 3 && Math.random() > 0.5) {
      const proj = new ProjectileUpgrade(this.scene, x, y);
      this.projectiles.push(proj);
      this.scene.physics.add.collider(proj, this.player, proj.onCollision);
    } else if (!this.player.shield) {
      const shield = new ShieldUpgrade(this.scene, x, y);
      this.shields.push(shield);
      this.scene.physics.add.collider(shield, this.player, shield.onCollision);
    }
  }

  cleanup() {
    this.projectiles = this.projectiles.filter(p => p.active);
    this.shields = this.shields.filter(s => s.active);
  }

  update(delta) {
    [...this.projectiles, ...this.shields].forEach(obj => {
      if (obj.y > this.scene.sys.game.config.height) obj.destroy();
    });
    this.cleanup();
  }
}

export default UpgradeManager;
