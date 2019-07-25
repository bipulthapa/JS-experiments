function assetsLoadingLoop(callback) {
    loadedPercent=((numAssets-assetsStillLoading)/numAssets)*100;
    console.log(loadedPercent)
    console.log(assetsStillLoading);

    if(assetsStillLoading == 0){
        callback();
        window.cancelAnimationFrame(assetsLoader);
    }else{
        assetsLoader = window.requestAnimationFrame(assetsLoadingLoop.bind(this, callback));
    }
}


function loadAssets(callback) 
{     //once this function finishes to load all assets this callback function gets activated

    function loadSprite(fileName) {
      assetsStillLoading++;
  
      let spriteImage = new Image();
      spriteImage.src = fileName;
  
      spriteImage.onload = function() {
        assetsStillLoading--;
      }

      spriteImage.onerror = function() {
          assetsStillLoading--;
      }
      
  
      return spriteImage;
    }

    SPRITES.pacManImages = loadSprite('./images/pac.png');
    SPRITES.pacmanLogo = loadSprite('./images/gameLogo.png');
    SPRITES.startSceenPacman = loadSprite('./images/newScreenPacman.png');
    SPRITES.gameOverScreen = loadSprite('./images/gameOverFinal1.png');
    SPRITES.mapTile  = loadSprite('./images/wallNew.png');
    SPRITES.pacmanDeath = loadSprite('./images/pacDeath1.png');
    SPRITES.instruction  = loadSprite('./images/instruction.png');
    numAssets = assetsStillLoading;
    assetsLoadingLoop(callback);


}

let assetsStillLoading = 0;
let assetsLoader;
let numAssets;
let loadedPercent;
const AUDIOS = {};
const SPRITES = {};

let canvas = document.getElementById('canvas');
var game =  new Game(canvas,CANVAS_WIDTH,CANVAS_HEIGHT);

loadAssets(game.init.bind(game));

