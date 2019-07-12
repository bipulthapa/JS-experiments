
function Carousel(imageContainer,imageWrapper,pictureWidth,pictureHeight,hold){
    this.imageContainer = imageContainer;
    this.imageWrapper = imageWrapper;
    this.totalImageCount;
    this.pictureWidth = pictureWidth;
    this.pictureHeight = pictureHeight;
    this.hold = hold;
    this.animationFrame;
    this.presentMargin;
    this.targetedMargin;
    this.currentIndex = 0;
    this.nextIndex=0;
    this.difference;
    this.speed = 0.04;
    this.rate = 0;
    this.leftSlider;
    this.rightSlider;
    this.roundCircle;

    this.initialCssConfiguration = function(){
        this.imageContainer.style.width = this.pictureWidth + "px";
        this.imageContainer.style.height = this.pictureHeight + "px";
        this.imageContainer.style.overflow = "hidden";
        this.imageContainer.style.border = "4px solid ligtblue";
        this.imageContainer.style.position = "relative";

        this.imageWrapper.style.marginRight = -4 + "px";
        this.totalImageCount = this.imageWrapper.querySelectorAll('img').length;
        this.imageWrapper.style.width = this.pictureWidth*this.totalImageCount+"px";
        this.imageWrapper.style.height = this.pictureHeight;
        this.imageWrapper.querySelectorAll('img').forEach(function(individualImage){
            individualImage.style.marginRight = -4 + "px";
        })

        this.leftSlider = document.createElement("div");
        this.leftSlider.setAttribute("id","slider-left");
        this.leftSlider.style.position = "absolute";
        this.leftSlider.style.position = "absolute";
        this.leftSlider.style.left = 0+"px";
        this.leftSlider.style.height = 30+"px";
        this.leftSlider.style.width = 30+"px";
        this.leftSlider.style.top = 120+"px";
        this.leftSlider.style.backgroundColor = "rgb(255,255,255,0.8)";
        this.leftSlider.style.backgroundImage = "url(./images/left-arrow.png)";
        this.leftSlider.style.backgroundPosition = "50% 50%";
        this.leftSlider.style.backgroundRepeat= "no-repeat";
        this.imageContainer.appendChild(this.leftSlider);

        this.rightSlider = document.createElement("div");
        this.rightSlider.setAttribute("id","slider-right");
        this.rightSlider.style.position = "absolute";
        this.rightSlider.style.right = 0+"px";
        this.rightSlider.style.height = 30+"px";
        this.rightSlider.style.width = 30+"px";
        this.rightSlider.style.top = 120+"px";
        this.rightSlider.style.backgroundColor = "rgb(255,255,255,0.8)";
        this.rightSlider.style.backgroundImage = "url(./images/right-arrow.png)";
        this.rightSlider.style.backgroundPosition = "50% 50%";
        this.rightSlider.style.backgroundRepeat= "no-repeat";
        this.imageContainer.appendChild(this.rightSlider);

        for(var loop=0;loop<this.totalImageCount;++loop){
            this.roundCircle = document.createElement("button");
            this.roundCircle.style.border = 0;
            this.roundCircle.style.borderRadius = "50%";
            this.roundCircle.style.width = 15 + "px";
            this.roundCircle.style.height = 15 + "px";
            this.roundCircle.style.background = "rgba(255,255,255,0.6)";
            this.roundCircle.style.position = "absolute";
            this.roundCircle.style.left = (loop+1)*18 + "%";
            this.roundCircle.style.margin= "10px 12px";
            this.roundCircle.style.bottom = 0;
            this.roundCircle.setAttribute('class','button-carosel');
            this.roundCircle.addEventListener("click", (e) => {
                var index = e.target.getAttribute('value');
                this.nextIndex = index;
                this.transition();
                this.currentIndex = index;
             })
            this.roundCircle.setAttribute('value',loop);
            imageContainer.appendChild(this.roundCircle);
        }
    }

    this.start = () => {
        this.leftSlider.addEventListener('click',()=>{
            if(this.currentIndex>0){
                this.nextIndex = this.currentIndex - 1;
                this.transition();
                this.currentIndex -=1;
            }
        })

        this.rightSlider.addEventListener('click',()=>{
            if (this.currentIndex < this.totalImageCount -1 && this.currentIndex >=0 ){
                this.nextIndex += 1;
                this.transition();
                this.currentIndex +=1
            }
        })
        setInterval(this.callBackFunctionStart.bind(this),this.hold);
    }

    this.callBackFunctionStart = function(){
        this.nextIndex = (this.currentIndex+1) % this.totalImageCount;
        this.transition();
        this.currentIndex = this.nextIndex;
        // var random = document.querySelectorAll( `.button-carosel`);
        // console.log(random);
        // // debugger;
        // random[this.currentIndex].style.background = "rgba(0,0,0,0.5)"
    };

    //transition function
    this.transition =()=>{
        this.presentMargin = calculateMargin(this.currentIndex,this.pictureWidth);
        this.targetedMargin = calculateMargin(this.nextIndex,this.pictureWidth);
        this.difference = this.targetedMargin - this.presentMargin;
        this.speed = 0.02;
        this.rate = 0;
        this.animationFrame =setInterval(this.callBackFunctionTransition.bind(this),1)
    }

    this.callBackFunctionTransition = function() {
        imageWrapper.style.marginLeft = -(this.presentMargin+this.difference*this.rate)+"px";
        this.rate += this.speed;

        if (this.rate >= 1){
            imageWrapper.style.marginLeft = -calculateMargin(this.nextIndex,this.pictureWidth)+"px";
            clearInterval(this.animationFrame);
        }
    }

    
}
var imageContainer = document.getElementsByClassName("carousel-container")[0];
var imageWrapper = document.getElementsByClassName("carousel-image-wrapper")[0];
var c1 = new Carousel(imageContainer,imageWrapper,400,240,3000);

c1.initialCssConfiguration();
c1.start();

var imageContainer1 = document.getElementsByClassName("carousel-container")[1];
var imageWrapper1 = document.getElementsByClassName("carousel-image-wrapper")[1];
var c2 = new Carousel(imageContainer1,imageWrapper1,400,240,2000);

c2.initialCssConfiguration();
c2.start();



