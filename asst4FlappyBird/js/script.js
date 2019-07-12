var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

const WIDTH = 900;
const HEIGHT = 600;
const GAME_POINT = 5;
const GAME_SCORE_X = WIDTH/2;
const GAME_SCORE_Y = HEIGHT/4;
const MENU_BOX_WIDTH = 220;
const MENU_BOX_HEIGHT = 100;
const INITIAL_POINT = 0;
const MOVING_BACKGROUND_IMAGE_HEIGHT = 100;
const BASE_MOVING_SPEED = 5;
const SCREEN_SHIFT_RANGE = 200;
const PIPE_GENERATION_RATE = 2000;

canvas.width = WIDTH;
canvas.height = HEIGHT;
ctx.fillRect(0, 0, WIDTH, HEIGHT);

var pipeArray = [];
var gameScore = 0;
var highestScore = 0;
var isStartScreen = true;
var isPipeRequired = false;
var menuBox = {
    x: WIDTH/3,
    y: HEIGHT/5*3,
    height: MENU_BOX_HEIGHT,
    width: MENU_BOX_WIDTH
}
var baseInitPosition = 0;

//object bird creation
var objBird = new Bird();
objBird.drawBird();


//adding images in js file
var pipePole = new Image();
pipePole.src = "./images/pipePole.png";

var pipeHead = new Image();
pipeHead.src = "./images/pipeHead.png"

var backgroundImage = new Image();
backgroundImage.src = "./images/bg3.png";

var backgroundMoveImage = new Image();
backgroundMoveImage.src = "./images/ground.png"
console.log(backgroundMoveImage);

//space bar event handler
document.onkeypress = (e) => {
    if (e.keyCode == "32"){
        objBird.flyUp();
    }
}

setInterval(function(){
    if(isPipeRequired){
        let randomPipe = new Pipe();
        pipeArray.push(randomPipe);
    }    
},PIPE_GENERATION_RATE)

//draw function
function draw(){
    var animation = requestAnimationFrame(draw)

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(INITIAL_POINT,INITIAL_POINT,WIDTH,HEIGHT); 
    ctx.fill();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.drawImage(backgroundImage,INITIAL_POINT,INITIAL_POINT,WIDTH,HEIGHT);
    ctx.closePath();

    objBird.updateYAxis();
    objBird.drawBird();
    
    pipeArray.forEach(function(value,index){
        value.drawPipe();
        value.updatePipe();
        if(value.isCrashed(objBird)){
            window.cancelAnimationFrame(animation);
            finalGameOverScreen();
        }
    })

    ctx.beginPath();
    ctx.drawImage(backgroundMoveImage,INITIAL_POINT,HEIGHT-MOVING_BACKGROUND_IMAGE_HEIGHT,WIDTH,MOVING_BACKGROUND_IMAGE_HEIGHT);
    ctx.drawImage(backgroundMoveImage,baseInitPosition+INITIAL_POINT,HEIGHT-MOVING_BACKGROUND_IMAGE_HEIGHT,WIDTH,MOVING_BACKGROUND_IMAGE_HEIGHT);

    ctx.closePath();

    baseInitPosition = baseInitPosition - BASE_MOVING_SPEED;
    if (baseInitPosition<-SCREEN_SHIFT_RANGE){
        baseInitPosition = 0;
    }

    for(var i=pipeArray.length-1; i >=0; i--){
        if(pipeArray[i].isOutofScreen()){
            pipeArray.splice(i,1);
            gameScore += GAME_POINT;
            highestScore = gameScore;
        }
    }

    //Printing the score on canvas
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = "50px Comic Sans MS"
    ctx.fillText(gameScore,GAME_SCORE_X,GAME_SCORE_Y);
    ctx.font = "20px Comic Sans MS";
    ctx.fillText("Highest Score: "+highestScore,10,40);
    ctx.fill();
    ctx.closePath(); 
}

initialStartScreen()


