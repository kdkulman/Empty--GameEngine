class Animator {
    constructor(spritesheet, xStart, yStart, width, height, frameCount, frameDuration) {
        Object.assign(this, {spritesheet, xStart, yStart, height, width, frameCount, frameDuration});
        this.scale = 1;
        this.elapsedTime = 0;
        this.totalTime = this.frameCount * this.frameDuration;

    };


    drawFrame(tick, ctx, x, y) {
        this.elapsedTime += tick;

        if (this.elapsedTime > this.totalTime) this.elapsedTime -= this.totalTime;
        if (this.isDone()) {
            if (this.loop) {
                this.elapsedTime = 0;
            } else {
                return;
            }
        }

        let frame = this.currentFrame();
        if (this.reverse) frame = this.frameCount - frame - 1;
        
         ctx.drawImage(this.spritesheet,
            this.xStart + frame * (this.width), this.yStart,  // source from sheet
            this.width, this.height,
            x, y,
            this.width, this.height);

    };

    currentFrame() {
        return Math.floor(this.elapsedTime / this.frameDuration);
    };

    isDone() {
        return (this.elapsedTime >= this.totalTime);
    };
}