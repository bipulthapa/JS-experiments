console.log("Smash the boxes")

const FRAME_RATE = 16.67;
const CONTENT_HEIGHT = 600;
const CONTENT_WIDTH = 800;

var frame = document.getElementById("frame");

frame.style.height = CONTENT_HEIGHT + "px";
frame.style.width = CONTENT_WIDTH + "px";
frame.style.backgroundColor = "lightgray";

class Ball{
    constructor(x,y, width, parentElement,color){
        this.x = x;
        this.y = y;
        this.width = this.height = width;
        this.element = null;
        this.color = color;
        this.parentElement = parentElement;
        this.velocity = {
            x: Math.random() > 0.5 ? Math.random()*4 : -Math.random()*3,
            y: Math.random() > 0.5 ? Math.random()*3 : -Math.random()*2
        }

    }

    init(){
        this.element = document.createElement("div");
        this.element.className = "box";
        this.element.style.position = "absolute";
        this.element.style.backgroundImage = "url(./images/ant.png)";
        this.element.style.backgroundSize = this.width + "px";
        this.element.style.backgroundRepeat = "no-repeat";
        this.element.onclick = function(event){
            event.target.style.display = "none";
        }
        this.parentElement.appendChild(this.element);
    }

    draw(){
        this.element.style.width = this.element.style.height = this.width +"px";
        this.element.style.borderRadius = 50+"%";
        this.element.style.backgroundColor = this.color;
        this.element.style.top = this.y + "px";
        this.element.style.left = this.x + "px";
    }

    move(){
        this.x += this.velocity.x;
        if (parseInt(this.x) >= CONTENT_WIDTH-this.width){
            this.velocity.x *=-1;
            this.x = CONTENT_WIDTH -this.width;
        }else if((this.x) <= 0){
            this.velocity.x *=-1;
            this.x = 0
        }
        this.y += this.velocity.y;
        if (parseInt(this.y) >= CONTENT_HEIGHT-this.width){
            this.velocity.y *=-1;
            this.y = CONTENT_HEIGHT -this.width;
        }else if((this.y) <= 0){
            this.velocity.y *=-1;
            this.y = 0
        }
    }

    isTouching(anotherBubble) {
        let x1 = this.x, y1 = this.y, x2 = anotherBubble.x, y2 = anotherBubble.y;
        var dx = x1 - x2;
        var dy = y1 - y2;
        var distance = parseInt(Math.sqrt(dx * dx + dy * dy));

        if(distance <= (Math.floor((this.width) / 2) + Math.floor(anotherBubble.width / 2))) {
            return true;
        }
    } 
} 


var frame = document.getElementById("frame");
frame.style.position = "relative";

var ballsArray = [];
var ballCount = 20;


for(var i=0;i<ballCount;++i){
    var radius = getRandomArbitary(30,50);
    var positionX = getRandomArbitary(0,CONTENT_WIDTH-radius);
    var positionY = getRandomArbitary(0,CONTENT_HEIGHT-radius);
    var tempBall = new Ball(positionX,positionY,radius,frame,getRgbValue(getRandomArbitary(0,256),getRandomArbitary(0,256),getRandomArbitary(0,256)));

    if(ballsArray.length != 0) {
        
        for(var k=0;k<ballsArray.length;k++){
            oldBall = ballsArray[k];
                if(tempBall.isTouching(oldBall)){
                 radius = getRandomArbitary(30,50);
                 positionX = getRandomArbitary(0,CONTENT_WIDTH-radius);
                 positionY = getRandomArbitary(0,CONTENT_HEIGHT-radius);
                 tempBall = new Ball(positionX,positionY,radius,frame,getRgbValue(getRandomArbitary(0,256),getRandomArbitary(0,256),getRandomArbitary(0,256)));
                 k = -1;
                }
        }
        ballsArray.push(tempBall);
    }else {
        ballsArray.push(tempBall);
    }
}


for(var j=0; j<ballsArray.length;++j){
    ballsArray[j].init();
    ballsArray[j].draw();
}


setInterval(function(){
    ballsArray.forEach(function(value,index){
        value.move();
        for(var i = 0; i < ballsArray.length; i++) {
            if(i != index) {
                if(value.isTouching(ballsArray[i])) {
                    let tempX = value.velocity.x;
                    let tempY = value.velocity.y;
                    value.velocity.x = ballsArray[i].velocity.x;
                    value.velocity.y = ballsArray[i].velocity.y;
                    ballsArray[i].velocity.x = tempX;
                    ballsArray[i].velocity.y = tempY;
                }
            }
        }
        value.draw();
    })
},
FRAME_RATE);
