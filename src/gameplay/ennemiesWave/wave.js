export default class Wave {
  constructor(scene, unitsCount) {
    this.scene = scene;
    this.enemies = [];

    for (let i = 0; i < unitsCount; i++) {
      const enemy = this.scene.enemyManager.spawn(0, 0);
      if (enemy) this.enemies.push(enemy);
    }
  }

  getLargestUnitWidth() {
    return Math.max(...this.enemies.map(e => e.width), 0);
  }

  getUnitByIndex(i) {
    return this.enemies[i];
  }

  countUnits() {
    return this.enemies.length;
  }

  remove(i) {
    const enemy = this.enemies[i];
    if (enemy) {
      enemy.setActive(false).setVisible(false);
      this.enemies.splice(i, 1);
    }
  }

  destroy() {
    this.enemies.forEach(e => e.setActive(false).setVisible(false));
    this.enemies = [];
  }
}

