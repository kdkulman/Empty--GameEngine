class Player {
  constructor(game) {
    this.game = game;
    this.x = 100;
    this.y = 780;
    this.acceleration = 2.5;
    this.currentSpeed = 0;
    this.maxSpeed = 30;
    this.direction = 0;
    this.moving = false;


    this.animatorIdleLeft = new Animator(ASSET_MANAGER.getAsset("./player_idle_left.png"), 0, 0, 256, 256, 8, 0.2);
    this.animator = new Animator(ASSET_MANAGER.getAsset("./player_idle.png"), 0, 0, 256, 256, 8, 0.2);
    this.animatorRunningLeft = new Animator(ASSET_MANAGER.getAsset("./player_running_left.png"), 0, -40, 320, 256, 5, .06);
    this.animatorRunning = new Animator(ASSET_MANAGER.getAsset("./player_running.png"), 0, -40, 320, 256, 5, .06);
  }

    update() {
      if (this.game.keys["ArrowRight"]) {
        this.moving = true;
        this.direction = 0;
      } else if (this.game.keys["ArrowLeft"]) {
        this.moving = true;
        this.direction = 180;
      } else {
        this.imageSpeed = 1;
        this.moving = false;
        this.currentSpeed = 0;
      }

      if (this.moving){
        this.currentSpeed += this.acceleration;
        this.currentSpeed = Math.min(this.currentSpeed, this.maxSpeed);
        this.direction = this.direction * Math.PI / 180;
        this.x += this.currentSpeed * Math.cos(this.direction);
        this.y += this.currentSpeed * Math.sin(this.direction);
      }

    }
    

    draw(ctx) {
        if (this.moving)  {
          if (this.direction === 0) {
            this.animatorRunning.drawFrame(this.game.clockTick, ctx, this.x, this.y);
          } else {
            this.animatorRunningLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y);
          }
        } else {
          if (this.direction === 0)
            this.animator.drawFrame(this.game.clockTick, ctx, this.x, this.y);
          else
            this.animatorIdleLeft.drawFrame(this.game.clockTick, ctx, this.x, this.y);
        }

        //draw text to canvas
        
        ctx.font = "50px Arial";
        ctx.fillText("X: " + Math.round(this.x), 10, 50);
        ctx.fillText("Y: " + Math.round(this.y), 10, 100);
        ctx.fillText("Speed: " + Math.round(this.currentSpeed), 10, 150);
        ctx.fillText("Direction: " + Math.round(this.direction * 180 / Math.PI), 10, 200);
        ctx.fillText("Moving: " + this.moving, 10, 250);
        ctx.fillText("Acceleration: " + this.acceleration, 10, 300);
        ctx.fillText("Use left and right arrow keys to become the edgelord", 10, 350);


    }
  
}

