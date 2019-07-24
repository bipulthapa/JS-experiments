const SPRITE_CLIPPING_WIDTH = 32;
const SPRITE_CLIPPING_HEIGHT = 32;


var pacManImages = new Image();
pacManImages.src = "./images/pac.png";

var pacmanLogo = new Image();
pacmanLogo.src = "./images/gameLogo.png";

var startScreenPacman = new Image();
startScreenPacman.src = "./images/newScreenPacman.png";

var gameOverScreen = new Image();
gameOverScreen.src = "./images/gameOverFinal1.png";

class Drawer {
    constructor(ctx) {
        this.ctx = ctx;
    }

    drawPacman(pacman) {
        this.ctx.beginPath();
        // this.ctx.arc(pacman.x, pacman.y, pacman.radius, 0, Math.PI * 2);
        this.ctx.drawImage(pacManImages,pacman.agentMouth,pacman.agentDirection,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,pacman.x-pacman.fullRadius-2,pacman.y-pacman.fullRadius-2,2*pacman.radius,2*pacman.radius);
        this.ctx.fillStyle = pacman.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawGhost(ghost, chasingMode) {
        this.ctx.beginPath();
        // this.ctx.arc(ghost.x, ghost.y, ghost.radius, 0, Math.PI * 2);
        // console.log(ghost);
        if(ghost.alive){
            if(chasingMode){
                // console.log(game.agentSprite);
                ghost.agentMouth = game.agentSprite.GHOST_DEATH*SPRITE_CLIPPING_WIDTH*2;
                ghost.agentDirection = ghost.agentDirection == 0 ? SPRITE_CLIPPING_HEIGHT : 0;
                this.ctx.drawImage(pacManImages,ghost.agentMouth,ghost.agentDirection,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,ghost.x-ghost.fullRadius-2,ghost.y-ghost.fullRadius-2,2*ghost.radius,2*ghost.radius);
            }else{
                this.ctx.drawImage(pacManImages,ghost.agentMouth,ghost.agentDirection,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,ghost.x-ghost.fullRadius-2,ghost.y-ghost.fullRadius-2,2*ghost.radius,2*ghost.radius);
    
            }
        }else{
            this.ctx.drawImage(pacManImages,416,64,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,ghost.x-ghost.fullRadius-2,ghost.y-ghost.fullRadius-2,2*ghost.radius,2*ghost.radius);
        }
        
        this.ctx.closePath();
    }

    drawScore(score) {
        this.ctx.font = "20px Comic Sans MS";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Score: " + score, 80, 20);
    }

    drawLives(lives) {
        this.ctx.font = "20px Comic Sans MS";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Lives: " + lives,500,20);
    }

    showNewGameScreen(){
        document.getElementById("play").innerHTML = "Lets Play !"
        this.ctx.beginPath();
        this.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
        this.ctx.fillStyle = "#0080ff";
        this.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
        this.ctx.drawImage(pacmanLogo,0,game.canvas.height/30,600,194);
        this.ctx.drawImage(pacManImages,game.pacman.agentMouth,0,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,canvas.width/2-2*game.pacman.radius,canvas.height*2/5,64,64);
        this.ctx.closePath();
    }

    drawCountDown(number){
        this.ctx.beginPath();
        this.ctx.font = "30px Comic Sans MS";
        this.ctx.fillText(number,game.canvas.width/2,game.canvas.height/2);
        this.ctx.closePath();
    }

    showGameWonScreen(){
        document.getElementById("play").innerHTML = "Play Again";
        document.getElementById("play").style.display=  "Block"
        this.ctx.beginPath();
        // this.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
        this.ctx.fillStyle = "#0080ff";
        this.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
        this.ctx.fill();
        this.ctx.drawImage(pacmanLogo,0,game.canvas.height/30,600,194);
        this.ctx.drawImage(pacManImages,game.pacman.agentMouth,0,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,canvas.width/2-2*game.pacman.radius,canvas.height*2/5,64,64);
        this.ctx.fillStyle = "white";
        this.ctx.font = "30px Comic Sans MS"
        this.ctx.textAlign = "center";
        this.ctx.fillText("Game Won. Congratulations!!",game.canvas.width/2,game.canvas.height*2/3-60);
        this.ctx.font = "20px Comic Sans MS";
        this.ctx.fillText("GameScore: "+game.score,game.canvas.width/2,game.canvas.height*2/3-20);
        this.ctx.fillText("Highest Score: "+window.localStorage.getItem("Highest Score"),game.canvas.width/2,game.canvas.height*2/3);
        this.ctx.fill();
        this.ctx.closePath();
    }

    showLostGameScreen(){
        document.getElementById("play").innerHTML = "Try Again!"
        document.getElementById("play").style.display=  "Block"
        this.ctx.beginPath();
        // this.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
        this.ctx.fillStyle = "#0080ff";
        this.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
        this.ctx.fill();
        this.ctx.drawImage(pacmanLogo,0,game.canvas.height/30,600,194);
        this.ctx.drawImage(pacManImages,game.pacman.agentMouth,0,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,canvas.width/2-2*game.pacman.radius,canvas.height*2/5,64,64);
        this.ctx.fillStyle = "white";
        this.ctx.font = "30px Comic Sans MS"
        this.ctx.textAlign = "center";
        this.ctx.fillText("Try Again!!",game.canvas.width/2,game.canvas.height*2/3-60);
        this.ctx.font = "20px Comic Sans MS";
        this.ctx.fillText("GameScore: "+game.score,game.canvas.width/2,game.canvas.height*2/3-20);
        this.ctx.fillText("Highest Score: "+window.localStorage.getItem("Highest Score"),game.canvas.width/2,game.canvas.height*2/3);
        this.ctx.fill();
        this.ctx.closePath();
    }

}