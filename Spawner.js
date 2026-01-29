/*
==============================
        SPAWNER
================================
*/
class Spawner {
    constructor(system, image) {
        this.system = system;
        this.image = image;
        this.rate = 5; // particules / seconde
        this.acc = 0;
    }

    update() {
        this.acc += this.rate / 60;
        while (this.acc >= 1) {
            this.spawn();
            this.acc--;
        }
    }

    spawn() {
        const size = Math.random() * 120 + 40; // taille aléatoire

        this.system.add(new SpriteParticle({
            image: this.image,
            x: canvas.width + size,
            y: Math.random() * canvas.height,
            speed: Math.random() * 2 + 1,
            angle: Math.PI,
            lifeFrames: 2000,
            frameCount: 10,
            frameSpeed: 3,
            baseWidth: size
        }));
    }
}