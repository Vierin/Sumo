import { gsap } from "gsap";
import { Player } from "./Player.js"
import { ScrollToPlugin } from "gsap/ScrollToPlugin.js";
import { browser } from "./Browsers.js";

gsap.registerPlugin(ScrollToPlugin)

export class Video {
    constructor() {
        this.views = document.querySelectorAll('[data-component="Video"]');

        if(this.views) {

            this.views.forEach(view => {
                this.init(view);

            });

        }
    }


    init(view) {
        let btnOpen = view.querySelector('.js-show');

        if(browser.mobile && view.parentElement.classList.contains('section--hero')) {
            btnOpen = document.querySelector('.js-show-m');
        }

        const btnClose = view.querySelector('.js-video-close');
        const curtain = view.querySelector('.js-video-curtain');
        const wrap = view.querySelector('.video__wrap');
        const bg = view.querySelector('.js-video-bg img');
        const back = view.parentElement.querySelector('.js-back');

        new Player(view.querySelector('.player'));

        const isSmall = view.classList.contains('video--small');

        const html = document.documentElement;

        btnOpen.addEventListener('click', () => {

            if(back) {
                const fast = back.classList.contains('scroll-fast');

                gsap.to(window, {duration: fast ? 0 : .7, scrollTo: back, onComplete: () => {
                    html.classList.toggle('is-video-open');
                    if(isSmall) {
                        gsap.to(curtain, {opacity: 1, duration: .2})

                        gsap.to(curtain, {scale: 35, duration: 1, onComplete: () => {
                            gsap.to(wrap, {opacity: 1, duration: .4, pointerEvents: "all"});
                        }});

                    } else {
                        gsap.to(curtain, {scale: 35, duration: 1, opacity: .8, onComplete: () => {
                            gsap.to(wrap, {opacity: 1, duration: .4, pointerEvents: "all"});
                        }});
                    }

                    if(bg) {
                        gsap.to(bg, {filter: "blur(10px)"});
                    }

                }})
            } else {
                html.classList.toggle('is-video-open');
                if(isSmall) {
                    gsap.to(curtain, {opacity: 1, duration: .2})

                    gsap.to(curtain, {scale: 35, duration: 1, onComplete: () => {
                        gsap.to(wrap, {opacity: 1, duration: .4, pointerEvents: "all"});
                    }});

                } else {
                    gsap.to(curtain, {scale: 35, duration: 1, opacity: .8, onComplete: () => {
                        gsap.to(wrap, {opacity: 1, duration: .4, pointerEvents: "all"});
                    }});
                }

                if(bg) {
                    gsap.to(bg, {filter: "blur(10px)"});
                }
            }

        })


        btnClose.addEventListener('click', () => {
            view.querySelector('.player').classList.remove('is-playing');
            view.querySelector('video').pause();

            gsap.to(wrap, {opacity: 0, duration: .4, pointerEvents: "none", onComplete: () => {
                if(isSmall) {
                    gsap.to(curtain, {scale: 1, duration: .7, delay: .4, onComplete: () => {
                        html.classList.toggle('is-video-open');
                    }});

                    gsap.to(curtain, {opacity: 0, duration: .2, delay: .9})
                } else {
                    gsap.to(curtain, {scale: 1, duration: .7, delay: .4, opacity: 1, onComplete: () => {
                        html.classList.toggle('is-video-open');
                    }});
                }

                if(bg) {
                    gsap.to(bg, {filter: "blur(0px)", duration: .7, delay: .4});
                }

            }});

        })
    }
}