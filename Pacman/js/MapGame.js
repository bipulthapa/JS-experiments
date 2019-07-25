function Map(){
    this.width = 500;
    this.height = 500;
    this.margin = 0;
    this.tileSize = 20;
    this.BLANK = 0;
    this.WALL = 1;
    this.BLOCK = 2;
    this.FOOD = 3;
    this.COOKIE = 4;
    this.DOOR = 5;
    
    this.leftTeleportTile = {
        row: 11,
        col: 0
    };
    this.rightTeleportTile = {
        row: 11, 
        col: 24
    };
    this.hasFoodElements = true;

    this.drawObstacle = function(ctx,row,col){
        ctx.fillStyle = "blue";
        var coordinates = this.getTileCoordinates(row,col);
        ctx.fillRect(coordinates.x, coordinates.y, this.tileSize,this.tileSize);        
    }

    this.drawFoodElement = function(ctx,row,col){
        ctx.fillStyle = "orange";
        var coordinates = this.getTileCenter(row, col);
        ctx.fillRect(coordinates.x - 1, coordinates.y - 1, 2, 2);
    }

    this.drawCookie = function(ctx,row,col){
        ctx.fillStyle = "orange";
        var coordinates = this.getTileCoordinates(row, col);
        ctx.beginPath();
        var radius = 4;
        ctx.arc(coordinates.x + (this.tileSize / 2),
            coordinates.y + (this.tileSize / 2),
            radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    this.drawGameSpace = function(ctx){
        ctx.fillStyle = 'blue';
        for (var col = 0; col < this.TILES.length; col++) {
            for (var row = 0; row < this.TILES[0].length; row++) {
                var coordinates = this.getTileCoordinates(row, col);
                ctx.fillRect(coordinates.x, coordinates.y, this.tileSize, this.tileSize);
            }
        }
    }
    
    this.getTileCoordinates = function(row,col){
        var x = this.margin + col*this.tileSize;
        var y =  this.margin+row*this.tileSize;
        return (x,y);
    }

    this.getTileCenter = function(row,col){
        var x = this.margin + col * this.tileSize + this.tileSize / 2;
        var y = this.margin + row * this.tileSize + this.tileSize / 2;
        return {x, y};
    }

    this.getTileRowColumn = function(x,y){
        if(x < this.margin || x >= this.width + this.margin || y < this.margin || y >= this.height + this.margin) {
            return {row: -1, col: -1};
        }

        var row = Math.floor((y - this.margin) / this.tileSize);
        var col = Math.floor((x - this.margin) / this.tileSize);
        return {row, col};
    }

    this.canTileBeVisited = function(row,col){
        if (this.isTileWithinBounds(row, col)) {
            const tile = this.TILES[row][col];
            return tile !== this.WALL && tile !== this.BLOCK && tile !== this.DOOR;
        }
        return false;
    }

    this.isTileWithinBounds = function(row,col){
        // return row >= 0 && row< this.TILES.length && col >= 0 && col < this.TILES.length;
        return row >= 0 && row< this.TILES.length && col >= 0 && col < this.TILES.length? true : false;
    };

    this.reset = function(){
        this.TILES = GameMap.getTiles();
        this.hasFoodElements = true;
    }

    this.getTiles = function(){
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
    this.TILES = this.getTiles();
    this.drawMap = function(ctx){
        this.hasFoodElements = false;
        for(var col =0; col < this.TILES.length;col++ ){
            for(var row = 0; row < this.TILES[0].length;row++){
                var tileType = this.TILES[row][col];
                if(tileType === this.WALL || tileType === this.BLOCK){
                    this.drawObstacle(ctx,row,col);
                }else if(tileType === this.FOOD){
                    this.hasFoodELements = true;
                    this.drawFoodElement(ctx,row,col);
                }else if(tileType === this.COOKIE){
                    this.hasFoodELements = true;
                    this.drawCookie(ctx,row,col);
                }
            }
        }
        if(!this.hasFoodElements){
            game.setGameState(game.gameStates.GAME_WON);
        }
    }
}



