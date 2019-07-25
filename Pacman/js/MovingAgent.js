const AGENT_SPRITE_WIDTH = 64;

class MovingAgent {

    constructor(map,agentSpriteIndex) {
        this.map = map;
        this.agentSpriteIndex = agentSpriteIndex;

        this.fullRadius = 12;
        // for packman size
        this.radius = 15; 

        // values for movement on x and y axis
        this.dx = 2;
        this.dy = 2;
        this.currentDir = this.initialDir();
        this.nextDir = this.initialDir();

        this.agentDirection = 0;
        this.agentMouth = this.agentSpriteIndex*AGENT_SPRITE_WIDTH;
    }
    updateAgentMouth(){
        if(this.agentMouth === this.agentSpriteIndex*AGENT_SPRITE_WIDTH){
            this.agentMouth = this.agentSpriteIndex*AGENT_SPRITE_WIDTH + 32;
         }else{
            this.agentMouth = this.agentSpriteIndex*AGENT_SPRITE_WIDTH;
        }
    }

    move(){
        if ((this.directionChanged() && this.canMove(this.nextDir)) ||
            !this.canMove(this.currentDir) && this.canMove(this.nextDir)) {
            //update direction
            this.currentDir = this.nextDir; 
            this.nextDir = this.initialDir();
        }

        // update location and teleport
        if (this.currentDir.RIGHT && this.canMoveRight()){
            this.moveRight();
        }else if (this.currentDir.LEFT && this.canMoveLeft()){
            this.moveLeft();
        }else if (this.currentDir.UP && this.canMoveUp()){
            this.moveUp();
        }else if (this.currentDir.DOWN && this.canMoveDown()){
            this.moveDown();
        }else if (this.currentDir.RIGHT && this.canTeleportRightToLeft()){
            this.teleportRightToLeft();
        }else if (this.currentDir.LEFT && this.canTeleportLeftToRight()){
            this.teleportLeftToRight();
        }     
    }

    canMove(dir) {
        if (dir.RIGHT){
            return this.canMoveRight()
        }else if(dir.LEFT){
             return this.canMoveLeft();
        } 
        else if (dir.UP){
            return this.canMoveUp();
        } 
        else if (dir.DOWN){
            return this.canMoveDown();
        } 
    }

    canMoveRight() {
        var tile = this.map.getTileRowColumn(this.x + this.fullRadius - 1+1, this.y);
        if (this.map.canTileBeVisited(tile.row, tile.col)) {
            var tileCoors = this.map.getTileCoordinates(tile.row, tile.col);
            if((tileCoors.y + this.fullRadius) === this.y){
                return true;
            }else{
                return false;
            }
        }
        return false;
    }

    canMoveLeft() {
        var tile = this.map.getTileRowColumn(this.x - this.fullRadius + 1 -2, this.y);
        if (this.map.canTileBeVisited(tile.row, tile.col)) {
            var tileCoors = this.map.getTileCoordinates(tile.row, tile.col);
            if((tileCoors.y + this.fullRadius) === this.y){
                return true;
            }else{
                return false;
            }        }
        return false;
    }

    canMoveUp() {
        var tile = this.map.getTileRowColumn(this.x, this.y - this.fullRadius + 1-2);
        if (this.map.canTileBeVisited(tile.row, tile.col)) {
            var tileCoors = this.map.getTileCoordinates(tile.row, tile.col);
            if((tileCoors.x + this.fullRadius) === this.x){
                return true;
            }else{
                return false;
            }        }
        return false;
    }

    canMoveDown() {
        var tile = this.map.getTileRowColumn(this.x, this.y + this.fullRadius - 1 + this.dy);
        if (this.map.canTileBeVisited(tile.row, tile.col)) {
            var tileCoors = this.map.getTileCoordinates(tile.row, tile.col);
            if((tileCoors.x + this.fullRadius) === this.x){
                return true;
            }else{
                return false;
            }        }
        return false;
    }

    canTeleportRightToLeft() {
        var tile = this.map.getTileRowColumn(this.x + this.fullRadius - 1 + this.dx, this.y);
        if(tile.row === -1 && tile.col === -1){
            return true;
        }else{
            return false;
        }
    }

    canTeleportLeftToRight() {
        var tile = this.map.getTileRowColumn(this.x - this.fullRadius + 1 - this.dx, this.y);
        if(tile.row === -1 && tile.col === -1){
            return true;
        }else{
            return false;
        }
    }

    moveRight() {
        this.currentDir = this.initialDir();
        this.currentDir.RIGHT = true;
        this.x += this.dx;
        this.agentDirection = 0;
    }

    moveLeft() {
        this.currentDir = this.initialDir();
        this.currentDir.LEFT = true;
        this.x -= this.dx;
        this.agentDirection = 64;
    }

    moveUp() {
        this.currentDir = this.initialDir();
        this.currentDir.UP = true;
        this.y -= this.dy;
        this.agentDirection = 96
    }

    moveDown() {
        this.currentDir = this.initialDir();
        this.currentDir.DOWN = true;
        this.y += this.dy;
        this.agentDirection = 32;
    }

    teleportRightToLeft() {
        this.currentDir = this.initialDir();
        this.currentDir.RIGHT = true;
        const destinationTile = this.map.getTileCoordinates(this.map.leftTeleportTile.row,
                                                            this.map.leftTeleportTile.col);
        this.x = destinationTile.x - this.fullRadius;
    }

    teleportLeftToRight() {
        this.currentDir = this.initialDir();
        this.currentDir.LEFT = true;
        const destinationTile = this.map.getTileCoordinates(this.map.rightTeleportTile.row,
                                                            this.map.rightTeleportTile.col);
        this.x = destinationTile.x + this.fullRadius;
    }

    directionChanged() {
        if (this.nextDir.UP || this.nextDir.RIGHT || this.nextDir.DOWN || this.nextDir.LEFT){
            if(!this.isNextDirSameAsCurrent()){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    isNextDirSameAsCurrent() {
        if(this.currentDir.UP === this.nextDir.UP && this.currentDir.RIGHT === this.nextDir.RIGHT && this.currentDir.DOWN === this.nextDir.DOWN && this.currentDir.LEFT === this.nextDir.LEFT){
            return true;
        }else{
            return false;
        }
    }

    resetDirs() {
        this.currentDir = this.initialDir();
        this.nextDir = this.initialDir();
    }

    initialDir() {
        return {
            UP: false,
            RIGHT: false,
            DOWN: false,
            LEFT: false
        };
    }

    getDirUp() {
        return {
            UP: true,
            RIGHT: false,
            DOWN: false,
            LEFT: false
        };
    }

    getDirRight() {
        return {
            UP: false,
            RIGHT: true,
            DOWN: false,
            LEFT: false
        };
    }

    getDirDown() {
        return {
            UP: false,
            RIGHT: false,
            DOWN: true,
            LEFT: false
        };
    }

    getDirLeft() {
        return {
            UP: false,
            RIGHT: false,
            DOWN: false,
            LEFT: true
        };
    }

}