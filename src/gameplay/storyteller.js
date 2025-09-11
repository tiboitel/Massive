class Storyteller {
    constructor() {
        this.temperature = 0.50;
        this.playerPerformance = 0.5;
        this.playerPerformanceWeight = 0.5,
        this.gameDifficulty = 0.1;
        this.gameDifficultyWeight = 0.5;
    }

    update(ticks) { 
        this.temperature = (this.gameDifficultyWeight * this.gameDifficulty) + (this.playerPerformanceWeight * this.playerPerformance);

        this.gameDifficulty = (ticks / 18256) % 1 ;

        if (this.temperature <= 0)
            this.temperature = 0;
        if (this.temperature >= 1)
            this.temperature = 1;
    }
}
