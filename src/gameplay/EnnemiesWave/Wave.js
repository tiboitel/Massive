class Wave { 
    constructor(scene, unitsCount) {
        this.unitsCount = unitsCount;
        this.scene = scene;
        this.units = [];    

        for (let i = 0; i < this.unitsCount; i++) { 
            this.scene.ennemy.push(new Ennemy(this.scene, 0, 0));
            this.scene.physics.add.collider(this.scene.ennemy[this.scene.ennemy.length - 1], this.scene.spaceship);
            this.units.push(this.scene.ennemy.length - 1);
        }
    }

    getLargestUnitWidth() {
        let size = 0;

        for (let i = 0; i < this.units.length; i++) {
            if (this.scene.ennemy[this.units[i]].width > size) {
                size = this.scene.ennemy[this.units[i]].width;
            }
        }

        return size;
    }

    getUnits() {
        return this.units;
    }

    getUnitByIndex(index) {
        return this.scene.ennemy[this.units[index]];
    }

    countUnits() {
        return this.units.length;
    }

    remove(index) {
        this.scene.ennemy.splice(this.units[index], 1);
        this.units.splice(index , 1);
    }

    destroy() {
        this.units = [];
    }
}