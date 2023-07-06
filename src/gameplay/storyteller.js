class Storyteller {
    constructor() {
        this.temperature = 0.00;
    }

    update(ticks) {
        if (ticks % 24 == 0) {
            this.temperature += 0.050;
        }
        if (this.temperature <= 0)
            this.temperature = 0;
        if (this.temperature >= 1)
            this.temperature = 1;
    }
}