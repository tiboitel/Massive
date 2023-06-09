const Patterns = {
    Line : 0,
    V: 1,
    Diagonal: 2
};

class WavePatterns {
    constructor(offsetX = 0, offsetY = 0, direction = 0) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.direction = direction;
    }

    applyWavePatterns(wave, patternType) {
        let largestUnitSize = wave.getLargestUnitWidth();
        let waveWidth = largestUnitSize * wave.countUnits();
        // TO-DO: Change the position calculation depends of the patterns.
        if (patternType == Patterns.Line) {
            let wavePosX = (this.direction) ? Phaser.Math.Between(largestUnitSize, wave.scene.game.config.width - waveWidth + 10) :
                Phaser.Math.Between(largestUnitSize + waveWidth, wave.scene.game.config.width);
            for (let i = 0; i < wave.countUnits(); i++) { 
                let currentEnemyPosX = (this.direction) ? wavePosX + (i * this.offsetX) : wavePosX - (i * this.offsetX);
                let currentEnemyPosY = this.offsetY * i;

                wave.getUnitByIndex(i).setPosition(currentEnemyPosX, currentEnemyPosY);
            }
        }
    }
}