export default class Wave {
  constructor(scene, unitsCount) {
    this.scene = scene;
    this.units = [];

    for (let i = 0; i < unitsCount; i++) {
      const enemy = this.scene.enemyManager.spawn(0, 0);
      if (enemy) this.units.push(enemy);
    }
  }

  getLargestUnitWidth() {
    return Math.max(...this.units.map(e => e.width), 0);
  }

  getUnitByIndex(i) {
    return this.units[i];
  }

  countUnits() {
    return this.units.length;
  }

  remove(i) {
    const enemy = this.units[i];
    if (enemy) {
      enemy.setActive(false).setVisible(false);
      this.units.splice(i, 1);
    }
  }

  destroy() {
    this.units.forEach(e => e.setActive(false).setVisible(false));
    this.units = [];
  }
}

