import { gsap } from "gsap";
import { browser } from './Browsers.js';
import { Swiper } from "swiper";

import ScrollTrigger from "gsap/src/ScrollTrigger.js";
import ScrollToPlugin from 'gsap/src/ScrollToPlugin.js'

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

export class Hero {
    constructor() {
        this.view = document.querySelector('[data-component="Hero"]');

        if(this.view) {
            this.init();
        }
    }




    init() {
        this.head = this.view.querySelector('.js-hero-head');
        this.intro = this.view.querySelector('.js-hero-intro');
        const duration = .5;
        const html = document.documentElement;


        if(browser.mobile) {
            this.snapOnMobile();
        }
        this.moveCircle();

        const target = this.view.querySelector('.js-hero-intro').offsetTop;

        let panels = gsap.utils.toArray(".js-section"),
            scrollTween;

        console.log(panels);


        let id;

        panels.forEach((panel, i) => {
            ScrollTrigger.create({
                trigger: panel,
                start: "top bottom",
                markers: false,
                end: "+=200%",
                onToggle: self => {
                    if(self.isActive && !scrollTween) {
                        if(self.trigger.classList.contains('js-dark')) {
                            document.querySelector('.js-header').classList.add('is-section-dark');
                            this.view.classList.add('is-active');
                            if(window.innerHeight < 800) {
                                gsap.to(this.circle, {top: this.startTop + "px", left: this.startLeft + "px"})
                            }
                        } else {
                            document.querySelector('.js-header').classList.remove('is-section-dark');
                            this.view.classList.remove('is-active');
                        }

                        if(!browser.mobile) {
                            scrollTween = gsap.to(window, {
                                scrollTo: `#${panel.id}`,
                                duration: 1,
                                onComplete: () => {
                                    scrollTween = null
                                },
                                overwrite: true
                            });
                        }

                    }
                }
            });
        });
    }


    checkTop() {
        window.addEventListener('scroll', e => {

            if(window.scrollY==0) {

                gsap.to(this.lastSection, {y: 0, delay: .4, duration: 1});
                setTimeout(()=> {
                    this.swiper.slideTo(1, 1000);
                },400)
            }

        })
    }

    checkTap() {
        let start;
        window.addEventListener('touchstart', e => {
            start = e.touches[0].clientY;
        })

        window.addEventListener('touchend', e => {
            console.log('touch');

            if(e.changedTouches[0].clientY - start > 0 && document.body.classList.contains('slider-finished') && window.scrollY <= 50) {
                gsap.to(this.lastSection, {y: 0, duration: 1});
                setTimeout(()=> {
                    this.swiper.slideTo(1, 1000);
                },200)
            }
        })
    }

    snapOnMobile() {

        this.lastSection = document.querySelector('.js-section#circles');

        this.swiper = new Swiper(this.view, {
            speed: 1000,
            direction: "vertical",
            on: {
                slideChange: (e) => {
                    console.log(e.activeIndex);



                    if(e.activeIndex >= 2) {

                        gsap.to(this.lastSection, {y: - (window.innerHeight + 60), delay: .4, duration: 1, onComplete: () => {
                            document.body.classList.add('slider-finished');
                        }})

                        this.checkTop();
                        this.checkTap()
                    } else {
                        document.body.classList.remove('slider-finished');
                    }

                    if(e.activeIndex > 0) {
                        document.body.classList.add('slider-start');
                        document.body.classList.remove('slider-ready');
                    } else {
                        document.body.classList.remove('slider-start');
                        document.body.classList.add('slider-ready');
                    }
                },
            }
        })
    }


    moveCircle() {
        const area = this.view.querySelector('.js-area');
        this.circle = this.view.querySelector('.js-circle-area');

        this.startTop = this.circle.offsetTop;
        this.startLeft = this.circle.offsetLeft;

        const half = this.circle.clientWidth * .5;

        area.addEventListener('mousemove', (e) => {
            let x = e.clientX - half;
            let y = e.clientY - half;
            gsap.to(this.circle, {top: y + "px", left: x + "px"})
        })
    }


}