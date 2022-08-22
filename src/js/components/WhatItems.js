import { gsap } from "gsap";
import { Swiper } from "swiper";

export class WhatItems {
    constructor() {
        this.view = document.querySelector('[data-component="WhatItems"]');

        if(this.view) {
            this.init();
        }
    }


    init() {
        this.btnsOpen = this.view.querySelectorAll('.analyses__item');
        this.btnClose = this.view.querySelector('.swiper__close');
        this.pagBtn = this.view.querySelectorAll('.js-pag');
        this.progressbar = this.view.querySelector('.js-progress');
        this.progress = this.progressbar.querySelector('.js-progress-line');

        this.progressWidth = this.progressbar.clientWidth / this.view.querySelectorAll('.swiper-slide').length;
        gsap.set(this.progress, {width: this.progressWidth});

        this.initSlider();


        this.btnClose.addEventListener('click', () => {
        document.body.classList.remove('is-right-open');
        })

        this.btnsOpen.forEach((btn, id) => {
            btn.addEventListener('click', () => {

                document.body.classList.add('is-right-open');
                this.swiper.slideTo(id, 0);
                this.setActiveEls(id);
            })

            this.pagBtn[id].addEventListener('click', () => {
                this.swiper.slideTo(id, 400);
                this.setActiveEls(id);
            })
        });
    }

    setActiveEls(id) {
        this.btnPrev.classList.remove('swiper-button-disabled');
        this.btnNext.classList.remove('swiper-button-disabled');

        if (id === 0) {
            this.btnPrev.classList.add('swiper-button-disabled')
        } else if(id >= this.slides.length - 1) {
            this.btnNext.classList.add('swiper-button-disabled')
        } else {
            this.btnPrev.classList.remove('swiper-button-disabled')
            this.btnNext.classList.remove('swiper-button-disabled')
        }

        this.pagBtn.forEach(el => {
            el.classList.remove('is-active');
        });
        this.pagBtn[id].classList.add('is-active');

        gsap.to(this.progress, {x: this.progressWidth * id});
    }

    initSlider() {
        this.btnPrev = this.view.parentElement.querySelector('.swiper-button-prev');
        this.btnNext = this.view.parentElement.querySelector('.swiper-button-next');
        this.slides = this.view.querySelectorAll('.swiper-slide');

        this.swiper = new Swiper(this.view.querySelector('.js-slider'), {
            speed: 600,
            allowTouchMove: false,
            spaceBetween: 30,
            on: {
                slideChange: (e) => {
                    this.setActiveEls(e.activeIndex);
                },
              },
        });

        this.btnNext.addEventListener('click', () => this.swiper.slideNext())
        this.btnPrev.addEventListener('click', () => this.swiper.slidePrev())
    }
}