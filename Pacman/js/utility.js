function sleep(ms) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > ms){
            break;
        }
    }
}

var alpha = function(name,age){
    this.name = name;
    this.age = age;
    this.result = function(){
        console.log(this.name, this.age);
    }
}


// function loadImages(imageSourceArray) {
//   let count = 0;
//     // let res = false;
//   for (let i = 0; i < imageSourceArray.length; i++) {
//     let image = new Image();
//     image.src = imageSourceArray[i];
//     if(image.onload = () => {
//       count++;
//       if (count >= imageSourceArray.length) {
//         return true;
//       }
//     }){
//         return true
//     }
//   }
// //  if(res){
// //      return res;
// //  }
// }

function loadImages(imageSourceArray, callback) {
  let count = 0;

  for (let i = 0; i < imageSourceArray.length; i++) {
    let image = new Image();
    image.src = imageSourceArray[i];
    image.onload = () => {
      count++;
      if (count >= imageSourceArray.length) {
        callback();
      }
    };
  }
}

function loadAudio(audioSourceArray){
    let count = 0;
    for (let i = 0; i < audioSourceArray.length; i++) {
        let audio = new Audio(audioSourceArray[i]);
        // audio.src = audioSourceArray[i];
        if(audio.oncanplaythrough = () => {
          count++;
          if (count >= audioSourceArray.length){
                return true;
            }
        }){
            return true;
        }
      }
}


function loadAssets(imageSourceArray,audioSourceArray,callback){
    // debugger;
    // console.log(loadImages(imageSourceArray))
    if(loadImages(imageSourceArray) && loadAudio(audioSourceArray)){
        callback();
    }
}


