export class StorytellerManager {
  constructor() {
    this.temperature = 0.5;
    this.playerPerformance = 0.5;
    this.playerPerformanceWeight = 0.5;
    this.gameDifficulty = 0.1;
    this.gameDifficultyWeight = 0.5;
  }

  update(ticks) {
    this.temperature =
      this.gameDifficultyWeight * this.gameDifficulty +
      this.playerPerformanceWeight * this.playerPerformance;

    this.gameDifficulty = (ticks / 18256) % 1;

    this.temperature = Phaser.Math.Clamp(this.temperature, 0, 1);
    console.log("[TEMPERATURE]: " + this.temperature)
  }
}

export default StorytellerManager;
