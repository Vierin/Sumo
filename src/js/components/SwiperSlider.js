import { gsap } from "gsap";
import { Swiper } from "swiper";
// import { breakpoint } from './Breakpoint.js';

export class SwiperSlider {
    constructor() {
        this.views = document.querySelectorAll('[data-component="SwiperSlider"]');

        if(this.views) {
            this.views.forEach(view => {
                this.init(view);
            });
        }
    }


    init(view) {

        const options = {};
        if(view.dataset.options) {
            const arr = view.dataset.options.split(', ');

            arr.forEach(el => {
                const items = el.split(':');
                options[items[0]] = items[1].trim();
            });
        }

        this.btnPrev = view.parentElement.querySelector('.swiper-button-prev');
        this.btnNext = view.parentElement.querySelector('.swiper-button-next');
        this.slides = view.querySelectorAll('.swiper-slide');

        console.log(this.btnNext, this.btnPrev);

        const swiper = new Swiper(view, {
            speed: 400,
            allowTouchMove: true,
            slidesPerView: options.slidesPerView ? +options.slidesPerView : 1,
            spaceBetween: options.spaceBetween ? +options.spaceBetween : 0,
            initialSlide: options.initialSlide ? +options.initialSlide : 0,
            on: {
                init: () => {

                    this.btnPrev.classList.add('swiper-button-disabled');
                },
                slideChange: (e) => {
                    if(!options.isCustom) {
                        if (e.activeIndex === 0) {
                            this.btnPrev.classList.add('swiper-button-disabled')
                        } else if(e.activeIndex >= this.slides.length - 1) {
                            this.btnNext.classList.add('swiper-button-disabled')
                        } else {
                            this.btnPrev.classList.remove('swiper-button-disabled')
                            this.btnNext.classList.remove('swiper-button-disabled')
                        }
                    } else {
                        if(e.activeIndex != 0) {
                            gsap.to(view, { x: -205, duration: .2 });
                            gsap.to([this.btnPrev, this.btnNext], { x: 125, duration: .2 });

                            this.btnPrev.classList.remove('swiper-button-disabled')
                            this.btnNext.classList.remove('swiper-button-disabled')

                            if(e.activeIndex === 2) {
                                this.btnNext.classList.add('swiper-button-disabled')
                            }
                        } else {
                            gsap.to(view, { x: 0 });
                            this.btnPrev.classList.add('swiper-button-disabled')
                        }
                    }
                },
              },
        });

        // if(!options.navigationNone) {
            this.btnNext.addEventListener('click', () =>
            {swiper.slideNext()
            })
            this.btnPrev.addEventListener('click', () => swiper.slidePrev())
        // }


    }

}