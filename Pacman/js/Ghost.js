const CLYDE_MODE_TOGGLE_DISTANCE = 8
class Ghost extends MovingAgent {

    constructor(map, name,agentSpriteIndex) {
        super(map,agentSpriteIndex);

        this.name = name;
        // this.color = this.getColor(name);
        const startingTile = this.getStartingTile(name);
        const startCoords = map.getTileCenter(startingTile.row, startingTile.col);

        this.x = startCoords.x;
        this.y = startCoords.y;

        // console.log(this.x,this.y)
        this.alive = true;
        this.deadTick = 0;
        this.lookAheadForPinky = 4;
        this.isChasingTimeOn = false;
    }

    move() {

        if (this.alive) {
            if(this.name === "blinky") {
                // this.nextDir = game.pacman.chasingMode ? this.randomDir() : this.chasePacmanDir();
                // this.nextDir = this.getDirUp;
                if(!game.pacman.chasingMode){
                    // this.nextDir = this.minDistanceAlgorithm(game.pacman.x,game.pacman.y);
                    this.nextDir = this.isChasingTimeOn ? this.minDistanceAlgorithm(game.pacman.x,game.pacman.y) : this.scatterMode(18*24,1*24);

                }else{
                    this.nextDir = this.scatterMode(18*24,1*24);
                }
            }else if(this.name === "pinky"){
                if(!game.pacman.chasingMode){
                    // this.nextDir = this.pinkyChase();
                    this.nextDir = this.isChasingTimeOn ? this.pinkyChase() : this.scatterMode(1*24,1*24);
                }
                else{
                    this.nextDir = this.scatterMode(1*24,1*24);
                }
            }else if(this.name === "inky"){
                if(!game.pacman.chasingMode){
                    // this.nextDir =this.inkyChase();
                    this.nextDir = this.isChasingTimeOn ? this.inkyChase() : this.scatterMode(18*24,18*24);

                }else{
                    this.nextDir = this.scatterMode(18*24,18*24);
                }
            }else if(this.name === "clyde"){
                if(!game.pacman.chasingMode){
                    // this.nextDir = this.clydeChase();
                    this.nextDir = this.isChasingTimeOn ? this.clydeChase() : this.scatterMode(1*24,18*24);

                }else{
                    this.nextDir = this.scatterMode(1*24,18*24);
                }
            }
            super.move();
        }
        else{
            if(this.name == "blinky"){
                var coordinates = this.getStartingTile(this.name);
                this.nextDir = this.minDistanceAlgorithm(coordinates.col*this.map.tileSize,coordinates.row*this.map.tileSize);
                if (this.x == coordinates.col*this.map.tileSize+this.fullRadius && this.y == coordinates.row*this.map.tileSize+this.fullRadius){
                    this.alive = true;
                    game.audioPlayer.ghostDeadSound.pause();
                }else{
                    if (!game.audioPlayer.isPlaying(game.audioPlayer.ghostDeadSound)) {
                        game.audioPlayer.ghostDeadSound.play();
                    }
                }
            }
            else if(this.name == "pinky"){
                var coordinates = this.getStartingTile(this.name);
                console.log(coordinates);
                this.nextDir = this.minDistanceAlgorithm(coordinates.col*this.map.tileSize,coordinates.row*this.map.tileSize);
                console.log(coordinates.row*this.map.tileSize+this.fullRadius,coordinates.col*this.map.tileSize+this.fullRadius);
                console.log(this.x,coordinates.col*this.map.tileSize+this.fullRadius,this.y,coordinates.row*this.map.tilSize+this.fullRadius);
                if (this.x == coordinates.col*this.map.tileSize+this.fullRadius && this.y == coordinates.row*this.map.tileSize+this.fullRadius){
                    this.alive = true;
                    game.audioPlayer.ghostDeadSound.pause();
                }else{
                    if (!game.audioPlayer.isPlaying(game.audioPlayer.ghostDeadSound)) {
                        game.audioPlayer.ghostDeadSound.play();
                    }
                }
            }
            else if(this.name == "inky"){
                var coordinates = this.getStartingTile(this.name);
                this.nextDir = this.minDistanceAlgorithm(coordinates.col*this.map.tileSize,coordinates.row*this.map.tileSize);
                if (this.x == coordinates.col*this.map.tileSize+this.fullRadius && this.y == coordinates.row*this.map.tileSize+this.fullRadius){
                    this.alive = true;
                    game.audioPlayer.ghostDeadSound.pause();
                }else{
                    if (!game.audioPlayer.isPlaying(game.audioPlayer.ghostDeadSound)) {
                        game.audioPlayer.ghostDeadSound.play();
                    }
                }
            }
            else if(this.name == "clyde"){
                var coordinates = this.getStartingTile(this.name);
                console.log(coordinates);
                this.nextDir = this.minDistanceAlgorithm(coordinates.col*this.map.tileSize,coordinates.row*this.map.tileSize);
                console.log(coordinates.row*this.map.tileSize+this.fullRadius,coordinates.col*this.map.tileSize+this.fullRadius);
                console.log(this.x,coordinates.col*this.map.tileSize+this.fullRadius,this.y,coordinates.row*this.map.tilSize+this.fullRadius);
                if (this.x == coordinates.col*this.map.tileSize+this.fullRadius && this.y == coordinates.row*this.map.tileSize+this.fullRadius){
                    this.alive = true;
                    game.audioPlayer.ghostDeadSound.pause();
                }else{
                    if (!game.audioPlayer.isPlaying(game.audioPlayer.ghostDeadSound)) {
                        game.audioPlayer.ghostDeadSound.play();
                    }
                }
            }
            super.move();
        }
    }

    // pinky algorithm
    pinkyChase(){
        var targetX = game.pacman.x;
        var targetY = game.pacman.y;
        if(game.pacman.currentDir.UP){
            targetY = game.pacman.y-this.lookAheadForPinky*game.map.tileSize;
        }else if(game.pacman.currentDir.DOWN){
            targetY = game.pacman.y+this.lookAheadForPinky*game.map.tileSize;
        }else if(game.pacman.currentDir.LEFT){
            targetX = game.pacman.x-this.lookAheadForPinky*game.map.tileSize;
        }else if(game.pacman.currentDir.RIGHT){
            targetX = game.pacman.x+this.lookAheadForPinky*game.map.tileSize;
        }

        return this.minDistanceAlgorithm(targetX,targetY);
    }

    //inky algorithm
    inkyChase(){
        // B + 2 * (P - B) = 2 * P - B to get Inky's target
        var targetX = 2*game.pacman.x - game.blinky.x;
        var targetY = 2*game.pacman.y - game.blinky.y;

        return this.minDistanceAlgorithm(targetX,targetY);
    }
    //if the distance between pacman and clyde become greater than CLYDE_MODE_TOGGLE_DISTANCE then clyde chases else it scatters randomly.
    clydeChase(){
        var clydeXPosition = game.clyde.x;
        var clydeYPosition = game.clyde.y;
        var currentClydeTile = game.map.getTileRowColumn(clydeXPosition, clydeYPosition);
        var pacmanXPosition = game.pacman.x;
        var pacmanYPosition = game.pacman.y;
        var currentPacmanTile = game.map.getTileRowColumn(pacmanXPosition,pacmanYPosition);
        if (Math.abs(currentClydeTile.row- currentPacmanTile.row) > CLYDE_MODE_TOGGLE_DISTANCE || Math.abs(currentClydeTile.column-currentPacmanTile.column) > CLYDE_MODE_TOGGLE_DISTANCE ){
            return this.minDistanceAlgorithm(pacmanXPosition,pacmanYPosition);
        }else{
            return this.scatterMode(1*24,18*24);
        }
    }

    scatterMode(targetX,targetY){
        return this.minDistanceAlgorithm(targetX,targetY);
    }

    minDistanceAlgorithm(targetX,targetY) {
        var distanceUp, distanceRight, distanceDown, distanceLeft;
        distanceUp = distanceRight = distanceDown = distanceLeft = Number.MAX_VALUE;

        var dirUp = this.getDirUp();
        var dirRight = this.getDirRight();
        var dirDown = this.getDirDown();
        var dirLeft = this.getDirLeft();

        if (this.canMoveUp() && !this.isOpposite(this.currentDir, dirUp)){
            distanceUp = Ghost.getDistance(this.x, this.y - this.dy, targetX, targetY);
        }
        if (this.canMoveRight() && !this.isOpposite(this.currentDir, dirRight)){
            distanceRight = Ghost.getDistance(this.x + this.dx, this.y, targetX, targetY);
        }
        if (this.canMoveDown() && !this.isOpposite(this.currentDir, dirDown)){
            distanceDown = Ghost.getDistance(this.x, this.y + this.dy, targetX, targetY);
        }
        if (this.canMoveLeft() && !this.isOpposite(this.currentDir, dirLeft)){
            distanceLeft = Ghost.getDistance(this.x - this.dx, this.y, targetX, targetY);
        }

        var minDist = Math.min(distanceUp, distanceRight, distanceDown, distanceLeft);
        if (minDist === distanceUp){
            return dirUp;
        } 
        else if (minDist === distanceRight){
            return dirRight;
        } 
        else if (minDist === distanceDown) {
            return dirDown;
        }
        else if (minDist === distanceLeft) {
            return dirLeft;
        }
    }

    die() {
        this.alive = false;
        this.agentDirection = 64;
        // this.reset();
    }

    deadPeriodElapsed() {
        return this.deadTick === game.fps * 3;
    }

    reset() {
        const startingTile = this.getStartingTile(this.name);
        const startCoords = game.map.getTileCenter(startingTile.row, startingTile.col);

        this.x = startCoords.x;
        this.y = startCoords.y;
        this.resetDirs();
        
    }

    getStartingTile(name) {
        switch (name) {
            case "blinky" : return {row: 9, col: 7}; 
            case "pinky"  : return {row: 9, col: 17}; 
            case "inky"   : return {row: 14, col: 7}; 
            case "clyde"  : return {row: 14, col: 17}; 
        }
    }

    isOpposite(dir1, dir2) {
        return (dir1.UP && dir2.DOWN) || (dir1.RIGHT && dir2.LEFT) ||
            (dir1.DOWN && dir2.UP) || (dir1.LEFT && dir2.RIGHT);
    }

    static getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

}
