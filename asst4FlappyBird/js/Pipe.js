const OFFSET = 10;
const DIFFERENCE = 150;

class Pipe{
    constructor(){
        this.x = WIDTH
        this.width = 80;
        this.speed = 5;
        this.topHeight = getRandomHeight(OFFSET,HEIGHT-DIFFERENCE-MOVING_BACKGROUND_IMAGE_HEIGHT);
        this.bottomHeight = HEIGHT-DIFFERENCE-this.topHeight-MOVING_BACKGROUND_IMAGE_HEIGHT;
    }

    drawPipe = () => {
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.drawImage(pipePole,this.x,0,this.width,this.topHeight);
        ctx.drawImage(pipeHead,this.x,this.topHeight-OFFSET,this.width,OFFSET);
        ctx.drawImage(pipePole, this.x,HEIGHT-this.bottomHeight-MOVING_BACKGROUND_IMAGE_HEIGHT, this.width, this.bottomHeight);
        ctx.drawImage(pipeHead,this.x,HEIGHT-this.bottomHeight-MOVING_BACKGROUND_IMAGE_HEIGHT,this.width,OFFSET);
        ctx.fill();
        ctx.closePath();
    }

    updatePipe = () => {
        this.x -= this.speed;
    }

    isOutofScreen = () => {
        if (this.x <= -this.width){
            return true;
        }else{
            return false;
        }
    }

    isCrashed = (bird) => {
            if (bird.y-BIRD_RADIUS<=this.topHeight || bird.y + 3/2*BIRD_RADIUS > HEIGHT - this.bottomHeight-MOVING_BACKGROUND_IMAGE_HEIGHT){
                if(bird.x > this.x && bird.x < this.x + this.width){
                    return true
                }
            }
            if (bird.y>=HEIGHT-3/2*bird.radius-MOVING_BACKGROUND_IMAGE_HEIGHT || bird.y <= bird.radius){
                return true;
            }
    }
}