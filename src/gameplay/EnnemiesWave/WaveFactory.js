class WaveFactory {
    constructor() {

    }

    create(ennemiesCount) {
        // Later when differents ennemies type, replace 48 hard-code size to spaceship size. 
        let ennemiesWavePatterns = new WavePatterns(48, ennemiesCount, 24, 8, 1); 
        let ennemiesWave = new Wave(ennemiesWavePatterns);

        ennemiesWavePatterns.applyWavePatterns(ennemiesWave, 0);
        return wave;
    }
}