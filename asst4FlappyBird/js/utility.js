var getRandomHeight = (min, max)  => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var getMousePos = (canvas,event) => {
    var canvasSize = canvas.getBoundingClientRect();
    return{
        x: event.clientX - canvasSize.left,
        y: event.clientY - canvasSize.top
    };
}

var isInside = (pos,menuBox) => {
    return pos.x>menuBox.x && pos.x<menuBox.x+menuBox.width &&  pos.y>menuBox.y && pos.y<menuBox.y+menuBox.height
}

canvas.addEventListener("click",function(evt){
    var mousePos = getMousePos(canvas,evt);
    isPipeRequired = true;
    
    if(isInside(mousePos,menuBox)){
        if(!isStartScreen){
            pipeArray = [];
            gameScore = 0;  
            objBird.y = HEIGHT/2;
            objBird.velocity = 0;
            objBird.drawBird();
        }
        draw();
    }
})

var initialStartScreen = () => {
    ctx.beginPath();
    ctx.fillStyle = "rgba(0,0,0,1)"
    ctx.fillRect(0,0,WIDTH,HEIGHT);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = "40px Comic Sans MS"
    ctx.fillText("Start Game",WIDTH/3,HEIGHT/3);
    ctx.font = "20px Comic Sans MS";
    ctx.fillText("Click the button ",WIDTH/3+30,HEIGHT/3+5*OFFSET);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "lightblue";
    ctx.fillRect(menuBox.x,menuBox.y,menuBox.width,menuBox.height);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.font = "30px Comic Sans MS";
    ctx.fillText("Start",WIDTH/3+70,HEIGHT/5*3+60,250,100);
    ctx.fill();
    ctx.closePath();

}

var finalGameOverScreen = () => {
    ctx.beginPath();
    ctx.fillStyle = "rgba(0,0,0,0.5)"
    ctx.fillRect(0,0,WIDTH,HEIGHT);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = "40px Comic Sans MS"
    ctx.fillText("Game Over",WIDTH/3,HEIGHT/3);
    ctx.fillText("Score= ",WIDTH/3+10,GAME_SCORE_Y-10)
    ctx.font = "20px Comic Sans MS";
    ctx.fillText("Click the button ",WIDTH/3+30,HEIGHT/3+5*OFFSET);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "lightblue";
    ctx.fillRect(menuBox.x,menuBox.y,menuBox.width,menuBox.height);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.font = "30px Comic Sans MS";
    ctx.fillText("Restart",WIDTH/3+50,HEIGHT/5*3+60,250,100);
    ctx.fill();
    ctx.closePath();

    isStartScreen = false;
}