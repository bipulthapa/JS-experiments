const PICTURE_WIDTH = 400;
const HOLD = 3000;

var imageContainer = document.getElementsByClassName("carousel-container");
var imageWrapper = document.getElementsByClassName("carousel-image-wrapper");
var imageArray = document.getElementsByTagName("img");
var totalImageCount = imageArray.length;
console.log(imageWrapper[0]);

imageWrapper[0].style.width = PICTURE_WIDTH*imageArray.length + "px";

// left slider creation
var leftSlider = document.createElement("div");
leftSlider.setAttribute("id","slider-left");
leftSlider.style.position = "absolute";
leftSlider.style.left = 0+"px";
leftSlider.style.height = 20+"px";
leftSlider.style.width = 20+"px";
leftSlider.style.top = 120+"px";
leftSlider.style.backgroundColor = "rgb(255,255,255,0.8)";
leftSlider.style.backgroundImage = "url(./images/left-arrow.png)";
leftSlider.style.backgroundRepeat= "none";
imageContainer[0].appendChild(leftSlider);

//right slider creation

var rightSlider = document.createElement("div");
rightSlider.setAttribute("id","slider-right");
rightSlider.style.position = "absolute";
rightSlider.style.right = 0+"px";
rightSlider.style.height = 20+"px";
rightSlider.style.width = 20+"px";
rightSlider.style.top = 120+"px";
rightSlider.style.backgroundColor = "rgb(255,255,255,0.8)";
rightSlider.style.backgroundImage = "url(./images/right-arrow.png)";
rightSlider.style.backgroundRepeat= "none";
imageContainer[0].appendChild(rightSlider);

//making nav buttons
for(var i=0;i<totalImageCount;++i){
    let nav = document.createElement("button");
    nav.style.border = 0;
    nav.style.borderRadius = "50%";
    nav.style.width = 15 + "px";
    nav.style.height = 15+"px";
    nav.style.background = "rgba(0,0,0,0.8)";
    nav.style.margin=  "10px 12px";
    nav.style.position = "absolute";
    nav.style.left = (i+1)*18 + "%";
    nav.style.bottom = 0;
    nav.onclick = function(e){
       var index = e.target.getAttribute('value');
       transition(parseInt(index));
       currentIndex = index;
    }
    nav.setAttribute("value",i);
    console.log(nav.getAttribute("value"));
    imageContainer[0].appendChild(nav);
}

var currentIndex = 0;
var nextIndex;
var difference;

// setInterval(function(){

//         nextIndex = (currentIndex+1)%totalImageCount;
//         console.log(currentIndex,nextIndex); 
//         currentIndex++;
//         imageWrapper[0].style.marginLeft = -(currentIndex)*PICTURE_WIDTH+"px";
//         console.log(imageWrapper[0].style.marginLeft) 
//         if(currentIndex>=totalImageCount-1){
//             currentIndex = -1;
//             nextIndex = 0;
//         }
// },2000)

setInterval(function(){
    nextIndex = (currentIndex+1) % totalImageCount;
    transition(nextIndex);
    console.log("Running")
    currentIndex = nextIndex;
},3000)

function transition(nextIndex){
    presentMargin = calculateMargin(currentIndex);
    console.log(currentIndex,nextIndex)
    targetedMargin = calculateMargin(nextIndex);
    difference = targetedMargin - presentMargin;
    speed = 0.02;
    rate = 0;

    animationFrame = setInterval(function(){
        imageWrapper[0].style.marginLeft = -(presentMargin+difference*rate)+"px";
        rate += speed;
        if (rate >= 1){
            imageWrapper[0].style.marginLeft = -calculateMargin(nextIndex)+"px";
            clearInterval(animationFrame);
        }
    },1)
}

// leftSlider.onclick = function(){
   
//     if(currentIndex > 0){
//         imageWrapper[0].style.marginLeft = -(currentIndex-1)*PICTURE_WIDTH+"px";
//         currentIndex -= 1; // replacing the index with previous index
//         // console.log(imageWrapper[0].style.marginLeft);
//     }else if (currentIndex < 0){ //last position condition
//         imageWrapper[0].style.marginLeft = -(totalImageCount-2)*PICTURE_WIDTH+"px";
//         currentIndex = totalImageCount-2; // one -2 for second last image of array
//         // console.log(imageWrapper[0].style.marginLeft);
//     } 
// }

leftSlider.addEventListener('click', () => {
    if(currentIndex > 0){
        // imageWrapper[0].style.marginLeft = -(currentIndex-1)*PICTURE_WIDTH+"px";
        imageWrapper[0].style.marginLeft = transition(currentIndex-1);
        console.log(currentIndex,nextIndex);
        currentIndex -= 1; // replacing the index with previous index
        // console.log(imageWrapper[0].style.marginLeft);
    }
});

rightSlider.addEventListener("click",()=>{
    if(currentIndex < totalImageCount-1 && currentIndex >=0){
        // imageWrapper[0].style.marginLeft = -(currentIndex+1)*PICTURE_WIDTH+"px";
        imageWrapper[0].style.marginLeft = transition(currentIndex+1);
        currentIndex += 1;
        // console.log(imageWrapper[0].style.marginLeft);
    }
})

// setInterval(function(){
//     // var particularClass = imageWrapper[0].style.marginLeft
//     leftMargin -= 0.1333;

//     imageWrapper[0].style.marginLeft = leftMargin + "px";
//     // console.log(imageWrapper[0].style.marginLeft);  
    
//     var totalWidth = PICTURE_WIDTH*totalImageCount;
//     if (-1*leftMargin>= totalWidth-400){
//         leftMargin = 0;
//     } 
//     // console.log("Hello World")
// },1)

