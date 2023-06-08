const Patterns = {
    Line : 0,
    V: 1,
    Diagonal: 2
};

class WavePatterns {
    constructor(ennemiesSize, offsetX = 0, offsetY = 0, waveDirection = 0) {
        this.ennemisCount = ennemiesCount;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.ennemiesSize = ennemiesSize;
        this.waveDirection = waveDirection;
        this.wavs = [];
    }

    applyWavePatterns(wave, patternType) {
        let waveWidth =  this.ennemiesSize * this.ennemiesCount;
        let wavePosX = (this.waveDirection) ? Phaser.Math.Between(this.ennemiesSize, game.config.width - waveWidth) :
            Phaser.Math.Between(this.ennemiesSize + waveWidth, game.config.width);

        for (let i = 0; i < this.ennemiesCount; i++) {
            let currentEnnemyPosX = (this.waveDirection) ? wavePosX + (i * this.offsetX) : wavePosX - (i * this.offsetX);
            let currentEnnemyPosY = this.offsetY * i;
            this.wave[i].x = currentEnnemyPosX;
            this.wave[i].y = currentEnnemyPosY;
        }

        return wave;
    }
}