/*
       ==============================
          SPRITE PARTICLE
       ================================
       */
class SpriteParticle {
    constructor({
        image,
        x,
        y,
        speed,
        angle,
        lifeFrames,
        frameCount,
        frameSpeed,
        baseWidth
    }) {
        this.image = image;

        // position
        this.x = x;
        this.y = y;

        // movement
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        // lifetime
        this.life = lifeFrames;
        this.dead = false;

        // animation
        this.frame = 0;
        this.frameCount = frameCount;
        this.frameSpeed = frameSpeed;
        this.frameTimer = 0;

        // size (ratio fixed)
        const SPRITE_W = 357;
        const SPRITE_H = 205;
        const ratio = SPRITE_H / SPRITE_W;

        this.width = baseWidth;
        this.height = baseWidth * ratio;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        this.frameTimer++;
        if (this.frameTimer >= this.frameSpeed) {
            this.frameTimer = 0;
            this.frame++;
            if (this.frame >= this.frameCount) {
                this.frame = 0; // fin de l’animation
            }
        }

        this.life--;
        if (this.life <= 0) this.dead = true;
    }

    draw(ctx) {
        const frameWidth = 357;
        const frameHeight = 205;

        ctx.drawImage(
            this.image,
            frameWidth * this.frame,
            0,
            frameWidth,
            frameHeight,
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        );
    }
}

