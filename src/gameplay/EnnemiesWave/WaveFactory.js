class WaveFactory {
    constructor() {

    }

    create(enemiesCount) {
        // Later when differents enemies type, replace 48 hard-code size to spaceship size. 
        let enemiesWavePatterns = new WavePatterns(48, enemiesCount, 24, 8, 1); 
        let enemiesWave = new Wave();

        enemiesWavePatterns.applyWavePatterns(enemiesWave, 0);
        return wave;
    }
}