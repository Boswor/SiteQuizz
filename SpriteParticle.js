/*
==============================
    SPRITE PARTICLE
================================
*/
class SpriteParticle {
    constructor(config) {
        Object.assign(this, config);

        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;

        this.frame = Math.floor(Math.random() * this.frameCount);
        this.frameTimer = 0;

        const ratio = this.frameHeight / this.frameWidth;
        this.width = this.baseWidth;
        this.height = this.baseWidth * ratio;

        this.dead = false;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        this.frameTimer++;
        if (this.frameTimer >= this.frameSpeed) {
            this.frameTimer = 0;
            this.frame++;

            if (this.frame >= this.frameCount) {
                if (this.loop) {
                    this.frame = 0;
                } else {
                    this.dead = true;
                }
            }
        }

        this.life--;
        if (this.life <= 0) this.dead = true;
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.frame * this.frameWidth,
            0,
            this.frameWidth,
            this.frameHeight,
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        );
    }
}
