function getLaneX(index){
    if (index == 1){
        return 10;
    }else if(index == 2){
        return 108;
    }else if(index == 3){
        return 200;
    }
}


function getRandomLane(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}