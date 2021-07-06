const Slider = {
    nextBtn : document.querySelector('._slider__next'),
    preBtn : document.querySelector('._slider__pre'),
    nav : document.querySelector('.slider__nav'),
    width: document.querySelector('.slider__img').offsetWidth,
    animationTime: 100,

    nextImg() {
        Slider.nextBtn.removeEventListener('click', Slider.nextImg);

        clearInterval(autoPlay);
        autoPlay = setInterval( () => {
            Slider.nextImg();
        }, 5000);

        let activeImg = document.querySelector('.slider__img-active');
        activeImg.style.transform = 'translate(' + 0 + 'px)';
                
        let nextImg = document.querySelector('.slider__img-next');
        nextImg.style.transform = 'translate(' + Slider.width + 'px)';

        let preImg = document.querySelector('.slider__img-pre');
        preImg.style.transform = 'translate(' + -Slider.width + 'px)';

        for (let index = 0; index < imgsNum; index++) {
            if ( navPoints[index].classList.contains('nav__point-active') ) {
                navPoints[index].classList.remove('nav__point-active');
                if (index < imgsNum - 1) {
                    navPoints[index + 1].classList.add('nav__point-active');
                    break;
                } else {
                    navPoints[0].classList.add('nav__point-active');
                    break;
                }
                
            }
        }

        let startTime = Date.now();

        let moveLeft = function() {
            let translateInMs = Slider.width / Slider.animationTime;
            let currTime = Date.now();
            let translate = (0 - (currTime - startTime) * translateInMs );
            let px = parseInt( activeImg.style.transform.replace('translate(', '') );
            activeImg.style.transform = 'translate(' + translate + 'px';
            nextImg.style.transform = 'translate(' + (Slider.width + translate) + 'px';
            if (px > -Slider.width) {
                window.requestAnimationFrame(moveLeft);
            } else {
                activeImg.style.transform = 'translate(' + -Slider.width + 'px)';
                nextImg.style.transform = 'translate(' + 0 + 'px)';

                imgsArr[0].classList.remove('slider__img-active');
                imgsArr[1].classList.remove('slider__img-next');
                imgsArr[imgsNum - 1].classList.remove('slider__img-pre');

                for (let index = 2; index < imgsNum - 1; index++) {
                    imgsArr[index].classList.remove('slider__img-hidden');
                }

                let changer = imgsArr.shift();
                imgsArr.push(changer);

                imgsArr[0].classList.add('slider__img-active');
                imgsArr[1].classList.add('slider__img-next');
                imgsArr[imgsNum - 1].classList.add('slider__img-pre');

                for (let index = 2; index < imgsNum - 1; index++) {
                    imgsArr[index].classList.add('slider__img-hidden');
                }

                Slider.nextBtn.addEventListener('click', Slider.nextImg);
            }
        }

        moveLeft();
    },

    preImg() {
        Slider.preBtn.removeEventListener('click', Slider.preImg);

        clearInterval(autoPlay);
        autoPlay = setInterval( () => {
            Slider.nextImg();
        }, 5000);

        let activeImg = document.querySelector('.slider__img-active');
        activeImg.style.transform = 'translate(' + 0 + 'px)';
                
        let preImg = document.querySelector('.slider__img-pre');
        preImg.style.transform = 'translate(' + -Slider.width + 'px)';

        let nextImg = document.querySelector('.slider__img-next');
        nextImg.style.transform = 'translate(' + Slider.width + 'px)';

        for (let index = 0; index < imgsNum; index++) {
            if ( navPoints[index].classList.contains('nav__point-active') ) {
                navPoints[index].classList.remove('nav__point-active');
                if (index > 0) {
                    navPoints[index - 1].classList.add('nav__point-active');
                    break;
                } else {
                    navPoints[imgsNum - 1].classList.add('nav__point-active');
                    break;
                }
            }
        }

        let startTime = Date.now();

        let moveRight = function() {
            let translateInMs = Slider.width / Slider.animationTime;
            let currTime = Date.now();
            let translate = (0 - (currTime - startTime) * translateInMs);
            let px = parseInt( activeImg.style.transform.replace('translate(', '') );
            activeImg.style.transform = 'translate(' + -translate + 'px';
            preImg.style.transform = 'translate(' + (-Slider.width - translate) + 'px';
            if (px < Slider.width) {
                window.requestAnimationFrame(moveRight);
            } else {
                activeImg.style.transform = 'translate(' + Slider.width + 'px)';
                preImg.style.transform = 'translate(' + 0 + 'px)';

                imgsArr[0].classList.remove('slider__img-active');
                imgsArr[1].classList.remove('slider__img-next');
                imgsArr[imgsNum - 1].classList.remove('slider__img-pre');

                for (let index = 2; index < imgsNum - 1; index++) {
                    imgsArr[index].classList.remove('slider__img-hidden');
                }

                let changer = imgsArr.pop();
                imgsArr.unshift(changer);

                imgsArr[0].classList.add('slider__img-active');
                imgsArr[1].classList.add('slider__img-next');
                imgsArr[imgsNum - 1].classList.add('slider__img-pre');

                for (let index = 2; index < imgsNum - 1; index++) {
                    imgsArr[index].classList.add('slider__img-hidden');
                }

                Slider.preBtn.addEventListener('click', Slider.preImg);
            }
        }

        moveRight();
    },

    chooseImg(pointNum) {
        freezeClic = true;
        console.log('no click!');

        let activePointNum;
        for (let index = 0; index < imgsNum; index++) {
            if ( navPoints[index].classList.contains('nav__point-active') ) {
                activePointNum = index;
                break;
            }
        } 

        let turnNum = pointNum - activePointNum;

        if (turnNum > 0) {
            this.nextImg();

            let chooseImgTimer = setInterval(() => {
                this.nextImg();
            }, Slider.animationTime * 1,1);

            setTimeout(() => {
                clearInterval(chooseImgTimer);
            }, (turnNum - 1) * Slider.animationTime * 1,1);

            setTimeout(() => {
                freezeClic = false;
                console.log('click!');
            }, (turnNum) * Slider.animationTime * 1,1);
        } else if (turnNum < 0) {
            turnNum *= -1;
            this.preImg();

            let chooseImgTimer = setInterval(() => {
                this.preImg();
            }, Slider.animationTime * 1,1);

            setTimeout(() => {
                clearInterval(chooseImgTimer);
            }, (turnNum - 1) * Slider.animationTime * 1,1);
            setTimeout(() => {
                freezeClic = false;
                console.log('click!');
            }, (turnNum) * Slider.animationTime * 1,1);
        }
    }
}

let imgs = document.querySelectorAll('.slider__img-file');
let imgsArr =  Array.from(imgs);
let imgsNum = imgsArr.length;

imgsArr[0].classList.add('slider__img-active');
imgsArr[1].classList.add('slider__img-next');
imgsArr[imgsNum - 1].classList.add('slider__img-pre');

for (let index = 2; index < imgsNum - 1; index++) {
    imgsArr[index].classList.add('slider__img-hidden');
}

let activeImg = document.querySelector('.slider__img-active');
activeImg.style.transform = 'translate(' + 0 + 'px)';
        
let nextImg = document.querySelector('.slider__img-next');
nextImg.style.transform = 'translate(' + Slider.width + 'px)';

let preImg = document.querySelector('.slider__img-pre');
preImg.style.transform = 'translate(' + -Slider.width + 'px)'

let navPoints = [];

for (let index = 0; index < imgsNum; index++) {
    let navPoint = document.createElement('div');
    navPoint.classList.add('nav__point');
    Slider.nav.append(navPoint);
    navPoints.push(navPoint);
}   
navPoints[0].classList.add('nav__point-active');


for (let index = 0; index < imgsNum; index++) {
    navPoints[index].addEventListener('click', () => {
        console.log('clicked!');
        Slider.chooseImg(index);
    });
}


let freezeClic = false; // just modify that variable to disable all clics events

document.addEventListener("click", e => {
    if (freezeClic) {
        e.stopPropagation();
        e.preventDefault();
    }
}, true);

Slider.nextBtn.addEventListener('click', Slider.nextImg);
Slider.preBtn.addEventListener('click', Slider.preImg);

let autoPlay = setInterval(() => {
    Slider.nextImg();
}, 5000);