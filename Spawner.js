/*
==============================
        SPAWNER
================================
*/
class Spawner {
    constructor(system, createParticle, rate = 10) {
        this.system = system;
        this.createParticle = createParticle;
        this.rate = rate;
        this.acc = 0;
    }

    update() {
        this.acc += this.rate / 60;
        while (this.acc >= 1) {
            this.system.add(this.createParticle());
            this.acc--;
        }
    }
}