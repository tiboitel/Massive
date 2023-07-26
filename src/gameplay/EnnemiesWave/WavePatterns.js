const Patterns = {
    Line : 0,
    V: 1,
    Cross: 2,    
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
        let centerX = Phaser.Math.Between(largestUnitSize, wave.scene.game.config.width - waveWidth + 10);
    
        if (patternType == Patterns.Line) {
            let wavePosY = 0;
            if (this.direction) {
                wavePosY = this.offsetY * (wave.countUnits() - 1);
            }
            for (let i = 0; i < wave.countUnits(); i++) {
                let currentEnemyPosX = centerX + (this.direction ? (i * this.offsetX) : -(i * this.offsetX));
                let currentEnemyPosY = wavePosY - (this.offsetY * i);
    
                wave.getUnitByIndex(i).setPosition(currentEnemyPosX, currentEnemyPosY);
            }
        }
    }
}