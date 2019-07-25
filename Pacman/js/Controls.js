class Controls {

    constructor() {
        // declare keys
        this.leftPressed = false;
        this.upPressed = false;
        this.rightPressed = false;
        this.downPressed = false;

        this.aPressed = false;
        this.wPressed = false;
        this.dPressed = false;
        this.sPressed = false;

        // key codes
        this.leftKey = 37;
        this.upKey = 38;
        this.rightKey = 39;
        this.downKey = 40;

        this.aKey = 65;
        this.wKey = 87;
        this.dKey = 68;
        this.sKey = 83; 

        document.addEventListener("keydown", this.keyDownHandler.bind(this));
        document.addEventListener("keyup", this.keyUpHandler.bind(this));
        document.getElementById('play').addEventListener("click",this.onclickEventHandler.bind(this));
        document.getElementById('easy').addEventListener('click',this.easyMode.bind(this));
        document.getElementById('medium').addEventListener('click',this.mediumMode.bind(this));
        document.getElementById('hard').addEventListener('click',this.hardMode.bind(this));
        document.getElementById("enemyPlayer").addEventListener('click',this.playerEnemyMode.bind(this));

    }

    keyDownHandler(e) {
        if(e.keyCode === this.leftKey) {
            this.leftPressed = true;
        }else if(e.keyCode === this.upKey) {
            this.upPressed = true;
        }else if(e.keyCode === this.rightKey) {
            this.rightPressed = true;
        }else if(e.keyCode === this.downKey) {
            this.downPressed = true;
        }

        if(e.keyCode === this.aKey){
            this.aPressed = true;
        }else if(e.keyCode === this.wKey){
            this.wPressed = true;
        }else if(e.keyCode === this.dKey){
            this.dPressed = true;
        }else if(e.keyCode === this.sKey){
            this.sPressed = true;
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

        if(e.keyCode === this.aKey){
            this.aPressed = false;
        }else if(e.keyCode === this.wKey){
            this.wPressed = false;
        }else if(e.keyCode === this.dKey){
            this.dPressed = false;
        }else if(e.keyCode === this.sKey){
            this.sPressed = false;
        }
    }

    onclickEventHandler(e){
        if(game.getGameState() === game.gameStates.NEW_GAME){
            game.setGameState(game.gameStates.LEVEL);
            document.getElementById("play").style.display ="none";
            document.getElementById("easy").style.display ="block";
            document.getElementById("medium").style.display ="block";
            document.getElementById("hard").style.display ="block";
            document.getElementById("enemyPlayer").style.display = "block";

        }else if (game.getGameState() === game.gameStates.GAME_LOST){
            game.isPlayerEnemyMode = false;
            game.startNewGame();
            document.getElementById("play").style.display = "none";
            document.getElementById("easy").style.display ="block";
            document.getElementById("medium").style.display ="block";
            document.getElementById("hard").style.display ="block";
            document.getElementById("enemyPlayer").style.display = "block";
            document.getElementById("enemyPlayer").innerHTML = "Player vs Enemy Player Mode";


        }
        else if(game.getGameState() === game.gameStates.GAME_WON){
            game.isPlayerEnemyMode = true;
            game.startNewGame();
            document.getElementById("play").style.display ="none";
            document.getElementById("easy").style.display ="block";
            document.getElementById("medium").style.display ="block";
            document.getElementById("hard").style.display ="block";
            document.getElementById("enemyPlayer").style.display = "block";
            document.getElementById("enemyPlayer").innerHTML = "Player vs Enemy Player Mode";

        }
    }

    easyMode(){
        this.levelMode(game.gameLevels.EASY);
    }

    mediumMode(){
        this.levelMode(game.gameLevels.MEDIUM);
    }

    hardMode(){
        this.levelMode(game.gameLevels.HARD);
    }

    levelMode(gameLevel){
        if(game.getGameState() === game.gameStates.LEVEL){
            game.setGameState(game.gameStates.STARTING);
            game.setGameLevel(gameLevel);
            document.getElementById("easy").style.display ="none";
            document.getElementById("medium").style.display ="none";
            document.getElementById("hard").style.display ="none";
            document.getElementById("enemyPlayer").style.display = "none";
        }
    }

    playerEnemyMode(){
            if(game.getGameState() === game.gameStates.LEVEL){
                game.isPlayerEnemyMode = true;
                game.setGameState(game.gameStates.INSTRUCTION);
                document.getElementById('play').style.display = "none";
                document.getElementById('easy').style.display ="none";
                document.getElementById('medium').style.display ="none";
                document.getElementById('hard').style.display ="none";
                document.getElementById('enemyPlayer').style.display = "block";
                document.getElementById('enemyPlayer').innerHTML = "Lets GO!!"
            }
            else if(game.getGameState() === game.gameStates.INSTRUCTION){
                console.log("Here")
                game.setGameState(game.gameStates.STARTING);
                document.getElementById('play').style.display = "none";
                document.getElementById('easy').style.display ="none";
                document.getElementById('medium').style.display ="none";
                document.getElementById('hard').style.display ="none";
                document.getElementById('enemyPlayer').style.display = "none";

            }


        

    }


}