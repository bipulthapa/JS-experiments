class Controls {

    constructor() {
        // declare keys
        this.leftPressed = false;
        this.upPressed = false;
        this.rightPressed = false;
        this.downPressed = false;

        // key codes
        this.leftKey = 37;
        this.upKey = 38;
        this.rightKey = 39;
        this.downKey = 40;

        document.addEventListener("keydown", this.keyDownHandler.bind(this));
        document.addEventListener("keyup", this.keyUpHandler.bind(this));
        document.getElementById('play').addEventListener("click",this.onclickEventHandler.bind(this));
    }

    keyDownHandler(e) {
        if(e.keyCode === this.leftKey) {
            this.leftPressed = true;
            // console.log()
        }else if(e.keyCode === this.upKey) {
            this.upPressed = true;
        }else if(e.keyCode === this.rightKey) {
            this.rightPressed = true;
        }else if(e.keyCode === this.downKey) {
            this.downPressed = true;
        }
    }

    keyUpHandler(e) {
        if(e.keyCode === this.leftKey) {
            this.leftPressed = false;
        }else if(e.keyCode === this.upKey) {
            this.upPressed = false;
        }else if(e.keyCode === this.rightKey) {
            this.rightPressed = false;
        }else if(e.keyCode === this.downKey) {
            this.downPressed = false;
        }
    }

    onclickEventHandler(e){
        if(game.getGameState() === game.gameStates.NEW_GAME){
            game.setGameState(game.gameStates.STARTING);
            document.getElementById("play").style.display ="none";
        }else if (game.getGameState() === game.gameStates.GAME_LOST){
            game.startNewGame();
            document.getElementById("play").style.display = "none";
        }
    }



}