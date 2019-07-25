function assetsLoadingLoop(callback) {
    loadedPercent=((numAssets-assetsStillLoading)/numAssets)*100;
    console.log(loadedPercent)

    if(assetsStillLoading == 0){
        callback();
        window.cancelAnimationFrame(assetsLoader);
    }else{
        assetsLoader = window.requestAnimationFrame(assetsLoadingLoop.bind(this, callback));
    }
}


function loadAssets(callback) {
    //call back function gets called after loading     
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

    function loadAudio(fileName){
        assetsStillLoading++;

        let audio = new Audio(fileName);
        audio.oncanplaythrough = function(){
            assetsStillLoading--;
        };
        return audio;
    }

    AUDIOS.startGame = loadAudio("sound/startGame.mp3");
    AUDIOS.eatFood =loadAudio("sound/eatFood.mp3");
    AUDIOS.die =loadAudio("sound/die.mp3");
    AUDIOS.eatCookie =loadAudio("sound/eatCookie.mp3");
    AUDIOS.chasing =loadAudio("sound/chasing.mp3");
    AUDIOS.eatGhost =loadAudio("sound/eatGhost.mp3");
    AUDIOS.ghostDead =loadAudio("sound/ghostDead.mp3");



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
const SPRITES = {};
const AUDIOS = {};

let canvas = document.getElementById('canvas');
var game =  new Game(canvas,CANVAS_WIDTH,CANVAS_HEIGHT);

loadAssets(game.init.bind(game));

