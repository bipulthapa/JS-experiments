const BIRD_RADIUS = 20;
const BIRD_INITIAL_XPOS = 30;
const BIRD_ANIMATION_FRAME = 150;

var birdImage = new Image();
birdImage.src = "./images/bird.png";

var birdImage1 = new Image();
birdImage1.src = "./images/bird2.png";

class Bird{ 
    constructor(){
        this.y = HEIGHT/2;
        this.x = BIRD_INITIAL_XPOS;
        this.radius = BIRD_RADIUS;
        this.velocity = 0;
        this.gravity = 0.4;
        this.upForce = -8;
        this.birdImageFrame = 0;
        this.imageFrame = 4;
        this.birdImageWidth = 60;
        this.birdImageHeight = 51;
        this.srcX;
        this.srcY;

        setInterval(() => {
            this.birdImageFrame = (this.birdImageFrame+1)%this.imageFrame;
        },BIRD_ANIMATION_FRAME)
    }

    drawBird = () => {
        ctx.beginPath(); 
        this.updateImageFrame();
        ctx.drawImage(birdImage,this.srcX,this.srcY,this.birdImageWidth,this.birdImageHeight,this.x-this.radius,this.y-this.radius,this.birdImageWidth,this.birdImageHeight);
        ctx.closePath();
    }

    updateYAxis = () => {
        this.velocity += this.gravity;
        this.y += this.velocity;

        if(this.y+this.radius >= HEIGHT){
            this.y = HEIGHT-this.radius;
            this.velocity = 0;
        }else if(this.y <= this.radius){
            this.y = this.radius;
        }
    }

    flyUp = () => {
        this.velocity = this.upForce;
    }

    updateImageFrame = ()=> {
        this.srcX = this.birdImageFrame * this.birdImageWidth;
        this.srcY = 0;
    } 
}