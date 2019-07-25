var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

var mat = [
            [1,1,1,0,1,1,1,1,0,1],
            [0,0,1,1,1,1,1,1,0,1],
            [1,1,0,1,0,1,1,1,0,1],
            [1,1,1,1,1,1,1,1,0,1],
            [1,1,1,0,1,1,1,1,0,1],
            [1,1,1,0,1,1,1,1,1,1],
            [0,0,1,1,1,1,1,1,0,1],
            [1,1,0,1,0,1,1,1,1,1],
            [1,1,1,1,1,1,1,1,1,1],
            [1,1,1,0,1,1,1,1,0,1],
        ]

// for transforming the matrix
var grid = mat[0].map(function(value,index){
   return mat.map(function(rowValue){
        return rowValue[index];
    })
})

var rows = grid.length;
var cols = grid[0].length;            

var openSet = [];
var closedSet = [];
var start;
var end;
var tileWidth,tileHeight; // fetch it from the map
var path= [];

tileWidth=canvas.width/cols;
tileHeight=canvas.height/rows;

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

function setup(){
    console.log("A*");
    for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
            let tempWall;
            if(grid[i][j] == 0 ){
                tempWall = true;
            }else{
                tempWall = false
            }
            grid[i][j] = new Spot(i,j);
            grid[i][j].wall = tempWall;
        }
    }


    for(var i=0;i<cols;i++){
        for(var j=0;j<rows;j++){
            grid[i][j].addNeighbors(grid);
        }
    }
    
    //In grid place first index col then row
    start = grid[2][1];
    end = grid[9][9];

    openSet.push(start);    
    console.log(start);
}

function draw(){
    var animation = requestAnimationFrame(draw);
    if(openSet.length>0){
        var winner = 0;
        for(var i=0;i<openSet.length;i++){
            if(openSet[i].f < openSet[winner].f){
                winner = i;
            }
        }
        var current = openSet[winner];

        if(current === end){
            cancelAnimationFrame(animation);
            console.log(path.reverse());
        }

        removeFromArray(openSet,current);
        // openSet.remove(current);
        closedSet.push(current);

        var neighbors = current.neighbors;
        for(var i=0; i<neighbors.length;i++){
            var neighbor = neighbors[i];

            //if closed set doesnt contains the g value then update the g value
            if(!closedSet.includes(neighbor) && !neighbor.wall){
                var tempG = current.g+1;

                if(openSet.includes(neighbor)){
                    if(tempG < neighbor.g){
                        neighbor.g = tempG;
                    }
                } else {
                    neighbor.g = tempG;
                    openSet.push(neighbor);
                }

                neighbor.h = heuristic(neighbor,end);
                neighbor.f = neighbor.g+neighbor.h; 
                neighbor.previous = current;
            }
        }
    }else{

    }

    path = [];
    var temp = current;
    path.push(temp);
    while(temp.previous){
        path.push(temp.previous);
        temp = temp.previous;
    }
    console.log(path)
}

function removeFromArray(openSet,current){
    for(var i= openSet.length-1; i>=0; i--){
        if(openSet[i] == current){
            openSet.splice(i,1);
        }
    }
}

function heuristic(nodeOne,nodeTwo){
   return Math.abs(nodeOne.i-nodeTwo.i)+Math.abs(nodeOne.j-nodeTwo.j)
}

setup();
draw(); 
