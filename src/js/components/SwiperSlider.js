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



        const btnPrev = view.parentElement.querySelector('.swiper-button-prev');
        const btnNext = view.parentElement.querySelector('.swiper-button-next');
        const slides = view.querySelectorAll('.swiper-slide');

        if(options.imageOutside) {
            this.imgs = view.parentElement.querySelectorAll('.js-swiper-img');
        }


        if(options.spaceBetween && window.innerWidth < 1450) {
            options.spaceBetween = options.spaceBetween * 2;
        }


        const swiper = new Swiper(view, {
            speed: 400,
            allowTouchMove:  options.touchNone ? false : true,
            slidesPerView: options.slidesPerView ? +options.slidesPerView : 1,
            spaceBetween: options.spaceBetween ? +options.spaceBetween : 0,
            initialSlide: options.initialSlide ? +options.initialSlide : 0,
            on: {
                init: () => {
                    if(!options.navigationNone) {
                        btnPrev.classList.add('swiper-button-disabled');
                    }
                },
                slideChange: (e) => {
                    if(!options.isCustom && !options.navigationNone) {
                        if (e.activeIndex === 0) {
                            btnPrev.classList.add('swiper-button-disabled')
                        } else if(e.activeIndex >= slides.length - 1) {
                            btnNext.classList.add('swiper-button-disabled')
                        } else {
                            btnPrev.classList.remove('swiper-button-disabled')
                            btnNext.classList.remove('swiper-button-disabled')
                        }
                    } else if(!options.navigationNone) {
                        if(e.activeIndex != 0) {
                            gsap.to(view, { x: -205, duration: .2 });
                            gsap.to([btnPrev, btnNext], { x: 125, duration: .2 });

                            btnPrev.classList.remove('swiper-button-disabled')
                            btnNext.classList.remove('swiper-button-disabled')

                            if(e.activeIndex === 2) {
                                btnNext.classList.add('swiper-button-disabled')
                            }
                        } else {
                            gsap.to(view, { x: 0 });
                            btnPrev.classList.add('swiper-button-disabled')
                        }
                    }

                    if(options.imageOutside) {
                        console.log(slides[e.activeIndex]);
                        if(slides[e.activeIndex].hasAttribute('data-image') ) {
                            const id = slides[e.activeIndex].getAttribute('data-image');
                            console.log(id);
                            gsap.fromTo(this.imgs[id], {opacity: 0, x: -20}, {opacity: 1, x: 0,  duration: .4});
                        } else {
                            this.imgs.forEach(img => {
                                gsap.to(img, {opacity: 0, x: 20, duration: .4});
                            });
                        }
                    }


                },
              },
        });

        if(!options.navigationNone) {
            btnNext.addEventListener('click', () => swiper.slideNext())
            btnPrev.addEventListener('click', () => swiper.slidePrev())
        } else {
            this.showPagination(swiper, view);

            if(options.initialSlide > 0) {
                this.setActiveEls(options.initialSlide)
            }
        }

    }

    showPagination(swiper, view) {
        this.pagBtns = view.querySelectorAll('.js-pag');
        this.progressbar = view.querySelector('.js-progress');
        this.progress = this.progressbar.querySelector('.js-progress-line');

        gsap.set(this.progress, {width: this.pagBtns[0].clientWidth})
        this.pagBtns.forEach((btn, id) => {

            btn.addEventListener('click', () => {
                swiper.slideTo(id, 400);
                this.setActiveEls(id)
            })


        });
    }

    setActiveEls(id) {

        this.pagBtns.forEach(el => {
            el.classList.remove('is-active');
        });
        this.pagBtns[id].classList.add('is-active');

        const progressWidth = this.pagBtns[0].clientWidth;
        const offset = (this.progressbar.clientWidth - progressWidth * this.pagBtns.length) / 2;

        this.scroll;

        switch (+id) {
            case 0:
                this.scroll = 0;
                break;
            case 1:
                this.scroll = progressWidth + offset;
                break;
            case 2:
                this.scroll = (progressWidth + offset) * 2 ;
                break;
        }
        gsap.to(this.progress, {x: this.scroll, width: this.pagBtns[0].clientWidth});
    }

}