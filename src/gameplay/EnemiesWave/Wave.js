class Wave { 
    constructor(scene, unitsCount) {
        this.unitsCount = unitsCount;
        this.scene = scene;
        this.units = [];    

        for (let i = 0; i < this.unitsCount; i++) { 
            this.scene.enemy.push(new Enemy(this.scene, 0, 0));
            this.scene.physics.add.collider(this.scene.enemy[this.scene.enemy.length - 1], this.scene.spaceship,
                this.scene.enemy[this.scene.enemy.length - 1].onCollision);
            // TODO: Trigger explosion animation here.
            this.units.push(this.scene.enemy.length - 1);
        }
    }

    getLargestUnitWidth() {
        let size = 0;

        for (let i = 0; i < this.units.length; i++) {
            if (this.scene.enemy[this.units[i]].width > size) {
                size = this.scene.enemy[this.units[i]].width;
            }
        }

        return size;
    }

    getUnits() {
        return this.units;
    }

    getUnitByIndex(index) {
        return this.scene.enemy[this.units[index]];
    }

    countUnits() {
        return this.units.length;
    }

    remove(index) {
        this.scene.enemy.splice(this.units[index], 1);
        this.units.splice(index , 1);
    }

    destroy() {
        this.units = [];
    }
}