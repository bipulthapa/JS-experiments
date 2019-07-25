class Collider {

     pacmanGhostCollision(pacman, ghost) {
        var dx = pacman.x-ghost.x;
        var dy = pacman.y-ghost.y;
        var distance = pacman.fullRadius+ghost.fullRadius

        if(Math.pow(distance,2)>Math.pow(dy,2)+Math.pow(dx,2)){
            return true;
        }else{
            return false;
        }
    }
}