function Spot(i,j){
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.wall = false;
    this.neighbors = [];
    this.previous = undefined;

    this.addNeighbors = function(grid){
    var i = this.i;
    var j = this.j;
    var rows = grid.length;
    var cols = grid[0].length;
    if(i<rows-1){
        this.neighbors.push(grid[i+1][j]);
    }
    if(i>0){
        this.neighbors.push(grid[i-1][j]);
    }
    if(j>0){
        this.neighbors.push(grid[i][j-1]);
    }
    if(j<cols-1){
        this.neighbors.push(grid[i][j+1]);
    }
    }
}