const SPRITE_CLIPPING_WIDTH = 32;
const SPRITE_CLIPPING_HEIGHT = 32;

class Drawer {
    constructor(ctx) {
        this.ctx = ctx;
    }

    drawPacman(pacman) {
        this.ctx.beginPath();
        this.ctx.drawImage(SPRITES.pacManImages,pacman.agentMouth,pacman.agentDirection,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,pacman.x-pacman.fullRadius-2,pacman.y-pacman.fullRadius-2,2*pacman.radius,2*pacman.radius);
        this.ctx.closePath();
    }

    drawPacmanDeath(mouth,pacmanX,pacmanY){
        this.ctx.beginPath();
        this.ctx.fillStyle = "rgba(224,189,0,0.9)";
        this.ctx.arc(pacmanX,pacmanY,14,0,2*Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.drawImage(SPRITES.pacmanDeath,mouth*32,0,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,pacmanX-12-4,pacmanY-12-2,28,28);
    }

    drawGhost(ghost, chasingMode) {
        this.ctx.beginPath();
        if(ghost.alive){
            if(chasingMode){
                ghost.agentMouth = game.agentSprite.GHOST_DEATH*SPRITE_CLIPPING_WIDTH*2;
                ghost.agentDirection = ghost.agentDirection == 0 ? SPRITE_CLIPPING_HEIGHT : 0;
                this.ctx.drawImage(SPRITES.pacManImages,ghost.agentMouth,ghost.agentDirection,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,ghost.x-ghost.fullRadius-2,ghost.y-ghost.fullRadius-2,2*ghost.radius,2*ghost.radius);
            }else{
                this.ctx.drawImage(SPRITES.pacManImages,ghost.agentMouth,ghost.agentDirection,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,ghost.x-ghost.fullRadius-2,ghost.y-ghost.fullRadius-2,2*ghost.radius,2*ghost.radius);
            }
        }else{
            this.ctx.drawImage(SPRITES.pacManImages,416,64,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,ghost.x-ghost.fullRadius-2,ghost.y-ghost.fullRadius-2,2*ghost.radius,2*ghost.radius);
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
        this.ctx.drawImage(SPRITES.pacmanLogo,0,game.canvas.height/30,600,194);
        this.ctx.drawImage(SPRITES.pacManImages,game.pacman.agentMouth,0,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,canvas.width/2-2*game.pacman.radius,canvas.height*2/5,64,64);
        this.ctx.closePath();
    }

    drawCountDown(number){
        this.ctx.beginPath();
        this.ctx.font = "30px Comic Sans MS";
        this.ctx.fillText(number,game.canvas.width/2,game.canvas.height/2);
        this.ctx.closePath();
    }

    levelScreen(){
        this.ctx.beginPath();
        this.ctx.fillStyle = "#0080ff";
        this.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
        this.ctx.fill();
        this.ctx.drawImage(SPRITES.pacmanLogo,0,game.canvas.height/30,600,194);
        this.ctx.drawImage(SPRITES.pacManImages,game.pacman.agentMouth,0,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,canvas.width/2-2*game.pacman.radius,canvas.height*2/5,64,64);
        this.ctx.fillStyle = "white";
        this.ctx.font = "30px Comic Sans MS"
        this.ctx.textAlign = "center";
        this.ctx.fillText("Choose Difficulty",game.canvas.width/2,game.canvas.height*2/3-60);
        this.ctx.font = "20px Comic Sans MS";
        this.ctx.fill();
        this.ctx.closePath();
    }

    showGameWonScreen(){
        document.getElementById("play").innerHTML = "Play Again";
        document.getElementById("play").style.display=  "Block"
        this.ctx.beginPath();
        this.ctx.fillStyle = "#0080ff";
        this.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
        this.ctx.fill();
        this.ctx.drawImage(SPRITES.pacmanLogo,0,game.canvas.height/30,600,194);
        this.ctx.drawImage(SPRITES.pacManImages,game.pacman.agentMouth,0,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,canvas.width/2-2*game.pacman.radius,canvas.height*2/5,64,64);
        this.ctx.fillStyle = "black";
        this.ctx.font = "30px Comic Sans MS"
        this.ctx.textAlign = "center";
        this.ctx.fillText("Winner Congratulations!!",game.canvas.width/2,game.canvas.height*2/3-60);
        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Comic Sans MS";
        this.ctx.fillText("GameScore: "+game.score,game.canvas.width/2,game.canvas.height*2/3-20);
        this.ctx.fillText("Highest Score: "+window.localStorage.getItem("Highest Score"),game.canvas.width/2,game.canvas.height*2/3);
        this.ctx.fill();
        this.ctx.closePath();
    }

    showLostGameScreen(){
        document.getElementById("play").innerHTML = "Try Again!";
        document.getElementById("play").style.display=  "Block";
        this.ctx.beginPath();
        this.ctx.fillStyle = "#0080ff";
        this.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
        this.ctx.fill();
        this.ctx.drawImage(SPRITES.pacmanLogo,0,game.canvas.height/30,600,194);
        this.ctx.drawImage(SPRITES.pacManImages,game.pacman.agentMouth,0,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,canvas.width/2-2*game.pacman.radius,canvas.height*2/5,64,64);
        this.ctx.fillStyle = "black";
        this.ctx.font = "30px Comic Sans MS"
        this.ctx.textAlign = "center";
        this.ctx.fillText("Try Again!!",game.canvas.width/2,game.canvas.height*2/3-60);
        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Comic Sans MS";
        this.ctx.fillText("Your Score: "+game.score,game.canvas.width/2,game.canvas.height*2/3-30);
        this.ctx.fillText("Highest Score: "+window.localStorage.getItem("Highest Score"),game.canvas.width/2,game.canvas.height*2/3);
        this.ctx.fill();
        this.ctx.closePath();
    }

    instructionScreen(){
        this.ctx.beginPath();
        this.ctx.fillStyle = "#0080ff";
        this.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);
        this.ctx.fill();
        this.ctx.drawImage(SPRITES.pacmanLogo,0,game.canvas.height/30,600,194);
        this.ctx.drawImage(SPRITES.pacManImages,game.pacman.agentMouth,0,SPRITE_CLIPPING_WIDTH,SPRITE_CLIPPING_HEIGHT,canvas.width/2-2*game.pacman.radius,canvas.height*2/5,64,64);
        this.ctx.drawImage(SPRITES.instruction,0,0,400,201,100,canvas.height/2,400,201);
        this.ctx.font = "20px Comic Sans MS";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("Enemy Player Control",170,325);
        this.ctx.fillText("Pacman Player Control",450,325);
        this.ctx.fill();
        this.ctx.closePath();
    }

}