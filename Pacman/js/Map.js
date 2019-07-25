const COOKIE_SIZE = 10;
const SCATTER_TIMEOUT_DECREMENT = 2;
const SPRITE_TILE_CLIPPING_SIZE = 96;
const SPRITE_TILE_SX = 3;
const SPRITE_TILE_SY = 3
const FOOD_SIZE = 2;
const SPRITE_DOOR_SX = 226;
const SPRITE_DOOR_SY = 4;
const SPRITE_DOOR_WIDTH= 88;
const SPRITE_DOOR_HEIGHT=20;

class Map {

    constructor() {
        this.width = 600;
        this.height = 600;
        this.tileSize = 24;
        this.BLANK = 0;
        this.WALL = 1;
        this.BLOCK = 2;
        this.FOOD = 3;
        this.COOKIE = 4;
        this.DOOR = 5;
        this.margin = 0;
        this.TILES = this.getTiles();
        this.leftTeleportTile = {row: 11, col: 0};
        this.rightTeleportTile = {row: 11, col: 24};
        this.hasFoodElements = true;
    }

    drawMap(ctx) {
        this.hasFoodElements = false;
        for (let col = 0; col < this.TILES.length; col++) {
            for (let row = 0; row < this.TILES[0].length; row++) {
                var tileType = this.TILES[row][col];
                if (tileType === this.WALL || tileType === this.BLOCK) {
                    this.drawObstacle(ctx, row, col);
                }
                else if (tileType === this.FOOD) {
                    this.hasFoodElements = true;
                    this.drawFoodElement(ctx, row, col);
                }
                else if (tileType === this.COOKIE) {
                    this.hasFoodElements = true;
                    this.drawCookie(ctx, row, col);
                }else if(tileType === this.DOOR){
                    this.drawDoor(ctx,row,col);
                }
            }
        }
        if (!this.hasFoodElements) {
            if(game.currentLevel === FINAL_GAME_LEVEL){
                debugger;
                game.setGameState(game.gameStates.GAME_WON);
                game.currentLevel = 1;
            }else{
                this.reset();
                game.pacman.resetForNextLevel();
                game.ghosts.forEach(function(ghost){
                        game.movingAgent.dx = 2;
                        game.movingAgent.dy = 2;
                        ghost.reset();
                    }
                )

                //next level speed increases by 0.5 and scatter timeout decreases by const scatter_timeout_decrement factor
                game.movingAgent.dx += 0.5;
                game.movingAgent.dy += 0.5;
                if(game.scatterTimeout>0){
                    game.scatterTimeout -= SCATTER_TIMEOUT_DECREMENT;
                } 
                game.currentLevel++;
                console.log("game level"+game.currentLevel);
                console.log("game speed"+game.movingAgent.dx,game.movingAgent.dy);
            }
            
        }
    }

    drawObstacle(ctx, row, col) {
        var coordinates = this.getTileCoordinates(row,col);
        // ctx.beginPath();
        // ctx.fillStyle = "blue";
        // ctx.fillRect(coordinates.x,coordinates.y,this.tileSize,this.tileSize);
        // ctx.fill();
        // ctx.closePath();
        ctx.drawImage(SPRITES.mapTile,SPRITE_TILE_SX,SPRITE_TILE_SY,SPRITE_TILE_CLIPPING_SIZE,SPRITE_TILE_CLIPPING_SIZE,coordinates.x,coordinates.y,this.tileSize,this.tileSize);
    }

    drawFoodElement(ctx, row, col){
        ctx.fillStyle = "orange";
        var coordinates = this.getTileCenter(row, col);
        ctx.fillRect(coordinates.x - 1, coordinates.y - 1, FOOD_SIZE, FOOD_SIZE);
    }

    drawCookie(ctx, row, col) {
        ctx.fillStyle = "orange";
        var coordinates = this.getTileCoordinates(row, col);
        ctx.beginPath();
        const radius = 4;
        ctx.fillRect(coordinates.x+this.tileSize/2-10/2,coordinates.y+this.tileSize/2-10/2,COOKIE_SIZE,COOKIE_SIZE)
        ctx.fill();
        ctx.closePath();
    }

    drawDoor(ctx,row,col){
        var coordinates = this.getTileCoordinates(row,col);
        ctx.beginPath();
        ctx.drawImage(SPRITES.mapTile,SPRITE_DOOR_SX,SPRITE_DOOR_SY,SPRITE_DOOR_WIDTH,SPRITE_DOOR_HEIGHT,coordinates.x,coordinates.y,this.tileSize,this.tileSize);
        ctx.closePath();
    }

    getTileCoordinates(row, col) {
        let x = this.margin + col * this.tileSize;
        let y = this.margin + row * this.tileSize;
        return {x, y};
    }

    getTileCenter(row, col) {
        let x = this.margin + col * this.tileSize + this.tileSize / 2;
        let y = this.margin + row * this.tileSize + this.tileSize / 2;
        return {x, y};
    }

    getTileRowColumn(x, y) {
        if(x < this.margin || x >= this.width + this.margin || y < this.margin || y >= this.height + this.margin) {
            return {row: -1, col: -1};
        }
        const row = Math.floor((y - this.margin) / this.tileSize);
        const col = Math.floor((x - this.margin) / this.tileSize);
        return {row, col};
    }

    canTileBeVisited(row, col) {
        if (this.isTileWithinBounds(row, col)) {
            const tile = this.TILES[row][col];
            if (tile !== this.WALL && tile !== this.BLOCK && tile !== this.DOOR){
                return true;
            }
        }
        return false;
    }

    isTileWithinBounds(row, col) {
        if(row >= 0 && row < this.TILES.length && col >= 0 && col < this.TILES.length){
            return true;
        }else{
            return false;
        }
    }

    reset() {
        this.TILES = this.getTiles();
        this.hasFoodElements = true;
    }

    //matrix for tiling
    getTiles() {
        return [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 2, 2, 2, 3, 2, 2, 2, 2, 2, 3, 1, 3, 2, 2, 2, 2, 2, 3, 2, 2, 2, 3, 1],
            [1, 4, 2, 2, 2, 3, 2, 2, 2, 2, 2, 3, 1, 3, 2, 2, 2, 2, 2, 3, 2, 2, 2, 4, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 1],
            [1, 3, 3, 3, 3, 3, 2, 3, 2, 2, 2, 3, 2, 3, 2, 2, 2, 3, 2, 3, 3, 3, 3, 3, 1],
            [1, 1, 1, 1, 1, 3, 2, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 2, 3, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 1, 3, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 3, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 1, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 3, 2, 0, 2, 2, 2, 5, 5, 5, 2, 2, 2, 0, 2, 3, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 3, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 3, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 3, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 1, 3, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 3, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 1, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 3, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 3, 1, 1, 1, 1, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 3, 2, 2, 2, 3, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 2, 3, 2, 2, 2, 3, 1],
            [1, 4, 3, 3, 2, 3, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 2, 3, 2, 3, 3, 4, 1],
            [1, 1, 1, 3, 2, 3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 3, 2, 3, 1, 1, 1],
            [1, 1, 1, 3, 2, 3, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 3, 2, 3, 1, 1, 1],
            [1, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 1],
            [1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 1],
            [1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
        
    }

}
