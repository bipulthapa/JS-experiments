 class AlgoStar{
     constructor(mat){
        //  this.mat = mat;
        //  this.grid = this.mat[0].map((val,index)=>{
            //  return this.mat.map((rowValue)=>rowValue[index]);
        //  })
        //  this.rows = grid.length;
        //  this.cols = grid[0].length;
        this.grid = [
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
        ];
         this.openSet = [];
         this.closedSet = [];
         this.start;
         this.end;
         this.tileWidth;
         this.tileHeight
         this.path = [];
         
     }

     checkRes(){
       
     }

     initAstar(ghostRow,ghostCol,pacmanRow,pacmanCol){
        // var grid = [
        //     [1,1,1,0,1,1,1,1,0,1],
        //     [0,0,1,1,1,1,1,1,0,1],
        //     [1,1,0,1,0,1,1,1,0,1],
        //     [1,1,1,1,1,1,1,1,0,1],
        //     [1,1,1,0,1,1,1,1,0,1],
        //     [1,1,1,0,1,1,1,1,1,1],
        //     [0,0,1,1,1,1,1,1,0,1],
        //     [1,1,0,1,0,1,1,1,1,1],
        //     [1,1,1,1,1,1,1,1,1,1],
        //     [1,1,1,0,1,1,1,1,0,1],
        // ];
        var rows = this.grid.length;
        var cols = this.grid[0].length;
        for(var i=0;i<cols;i++){
            for(var j=0;j<rows;j++){
                let tempWall;
                if(this.grid[i][j] == 0 ){
                    tempWall = true;
                }else{
                    tempWall = false
                }
                this.grid[i][j] = new Spot(i,j);
                this.grid[i][j].wall = tempWall;
            }
        }

        for(var i=0;i<cols;i++){
            for(var j=0;j<rows;j++){
                this.grid[i][j].addNeighbors(this.grid);
            }
        }

        this.start = this.grid[ghostCol][ghostRow];
        this.end = this.grid[pacmanCol][pacmanRow];
        // console.log(this.start,this.end);
        this.openSet.push(this.start);  
        // console.log(this.openSet);
     }

     aStarDraw(){
        
        if(this.openSet.length>0){
            var winner = 0;
            for(var i=0;i<this.openSet.length;i++){
                if(this.openSet[i].f < this.openSet[winner].f){
                    winner = i;
                }
            }
            var current = this.openSet[winner];
    
            if(current === this.end){
                // cancelAnimationFrame(animation);
                console.log("Done");
                this.path = [];
                var temp = current;
                this.path.push(temp);
                while(temp.previous){
                    this.path.push(temp.previous);
                    temp = temp.previous;
                }
                // debugger;
                return this.path.reverse();
                // cancelAnimationFrame(this.animation);
            }
    
            this.removeFromArray(this.openSet,current);
            // openSet.remove(current);
            this.closedSet.push(current);
    
            var neighbors = current.neighbors;
            for(var i=0; i<neighbors.length;i++){
                var neighbor = neighbors[i];
    
                //if closed set doesnt contains the g value then update the g value
                if(!this.closedSet.includes(neighbor) && !neighbor.wall){
                    var tempG = current.g+1;
    
                    if(this.openSet.includes(neighbor)){
                        if(tempG < neighbor.g){
                            neighbor.g = tempG;
                        }
                    } else {
                        neighbor.g = tempG;
                        this.openSet.push(neighbor);
                    }
    
                    neighbor.h = this.heuristic(neighbor,this.end);
                    neighbor.f = neighbor.g+neighbor.h; 
                    neighbor.previous = current;
                }
            }
        }else{
            return [];
        }
    
        
     }

     removeFromArray(openSet,current){
        for(var i= openSet.length-1; i>=0; i--){
            if(openSet[i] == current){
                openSet.splice(i,1);
            }
        }
    }

    heuristic(nodeOne,nodeTwo){
        return Math.abs(nodeOne.i-nodeTwo.i)+Math.abs(nodeOne.j-nodeTwo.j)
     }
 
}