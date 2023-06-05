const Patterns = {
    Line : 0,
    V: 1,
    Diagonal: 2
};

class WavePatterns {
    constructor(ennmiesType, ennemiesSize, ennemiesCount, offsetX = 0, offsetY = 0, waveDirection = 0) {
        this.ennemiesType = ennemiesType;
        this.ennemisCount = ennemiesCount;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.ennemiesSize = ennemiesSize;
        this.waveDirection = waveDirection;
        this.ennemiesWave = [];
    }

    buildWave(patternType) {
        let waveWidth =  this.ennemiesSize * this.ennemiesCount;
        let wavePosX = (this.waveDirection) ? Phaser.Math.Between(this.ennemiesSize, game.config.width - waveWidth) :
            Phaser.Math.Between(this.ennemiesSize + waveWidth, game.config.width);

        for (let i = 0; i < this.ennemiesCount; i++) {
            let currentEnnemyPosX = (this.waveDirection) ? wavePosX + (i * this.offsetX) : wavePosX - (i * this.offsetX);
            let currentEnnemyPosY = this.offsetY * i;
            this.ennemiesWave.push({currentEnnemyPosX});
            // this.ennemy.push(new Ennemy(this, currentEnnemyPosX, -3 * (i * 6)));
            // this.physics.add.collider(this.ennemy[this.ennemy.length - 1], this.spaceship);
        }
    }

    getCurrentWave() {
        return this.ennemiesWave;
    }

    resetWave() { 
        this.ennemiesWave = {};
    }
}