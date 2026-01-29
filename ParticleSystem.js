/*
==============================
        SYSTEM
================================
*/
class ParticleSystem {
    constructor(ctx) {
        this.ctx = ctx;
        this.particles = [];
    }

    add(particle) {
        this.particles.push(particle);
    }

    update() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.update();
            if (p.dead) this.particles.splice(i, 1);
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for (const p of this.particles) p.draw(this.ctx);
    }
}