import { gsap } from "gsap";
import { Swiper } from "swiper";
// import { breakpoint } from './Breakpoint.js';

export class SwiperSlider {
    constructor() {
        this.view = document.querySelector('[data-component="SwiperSlider"]');

        if(this.view) {
            this.init();
        }
    }


    init(view) {
        this.btnPrev = this.view.parentElement.querySelector('.swiper-button-prev');
        this.btnNext = this.view.parentElement.querySelector('.swiper-button-next');
        this.slides = this.view.querySelectorAll('.swiper-slide');

        const swiper = new Swiper(this.view, {
            speed: 400,
            allowTouchMove: false,
            spaceBetween: this.view.dataset.space ? this.view.dataset.space : 0,
            initialSlide: this.view.dataset.slide ? this.view.dataset.slide : 0,
            on: {
                init: () => {
                    this.btnPrev.classList.add('swiper-button-disabled')
                },
                slideChange: (e) => {
                    if (e.activeIndex === 0) {
                        this.btnPrev.classList.add('swiper-button-disabled')
                    } else if(e.activeIndex >= this.slides.length - 1) {
                        this.btnNext.classList.add('swiper-button-disabled')
                    } else {
                        this.btnPrev.classList.remove('swiper-button-disabled')
                        this.btnNext.classList.remove('swiper-button-disabled')
                    }

                },
              },
        });

        this.btnNext.addEventListener('click', () => swiper.slideNext())
        this.btnPrev.addEventListener('click', () => swiper.slidePrev())
    }


}