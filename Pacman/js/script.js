// var canvas = document.getElementById('canvas');
// var game = new Game(canvas,CANVAS_WIDTH,CANVAS_HEIGHT);
// game.init()
 
const GAME_IMAGES = [PACMAN_IMAGES,PACMAN_LOGO,START]

window.addEventListener("load", function () {
    // get canvas element
    var canvas = document.getElementById('canvas');
    //create game world
    var game = new Game(canvas,CANVAS_WIDTH,CANVAS_HEIGHT);
    //load game assets and start game
    loadImages(GAME_IMAGES, game.init.bind(game));
});