import Wave from "./wave.js";
import WavePatterns from "./wavePatterns.js";

export default class WaveFactory {
  static create(scene, count, pattern = "line") {
    if (!WavePatterns[pattern]) {
      console.warn(`[WaveFactory] Pattern "${pattern}" not found. Falling back to "line".`);
      pattern = "cross";
    }

    const wave = new Wave(scene, count);
    const positions = WavePatterns[pattern](scene, count);

    wave.enemies.forEach((enemy, index) => {
      if (positions[index]) {
        enemy.setPosition(positions[index].x, positions[index].y);
      }
    });

    return wave;
  }
}

