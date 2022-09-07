import { gsap } from "gsap";
import { Player } from "./Player.js"
import { ScrollToPlugin } from "gsap/ScrollToPlugin.js";

gsap.registerPlugin(ScrollToPlugin)

export class Video {
    constructor() {
        this.view = document.querySelector('[data-component="Video"]');

        if(this.view) {
            this.init();
            new Player(this.view.querySelector('.player'));
        }
    }


    init() {
        this.btnOpen = this.view.querySelector('.js-show');
        this.btnClose = this.view.querySelector('.js-video-close');
        this.curtain = this.btnOpen.querySelector('span');
        this.wrap = this.view.querySelector('.video__wrap');
        this.bg = this.view.querySelector('.js-video-bg img');
        this.back = document.querySelector('.js-back');

        this.html = document.documentElement;

        this.btnOpen.addEventListener('click', () => {
            const fast = this.back.classList.contains('scroll-fast')
            gsap.to(window, {duration: fast ? 0 : .7, scrollTo: this.back, onComplete: () => {
                this.html.classList.toggle('is-video-open');
                gsap.to(this.curtain, {scale: 35, duration: 1, opacity: .8, onComplete: () => {
                    gsap.to(this.wrap, {opacity: 1, duration: .4, pointerEvents: "all"});
                }});

                gsap.to(this.bg, {filter: "blur(10px)"});
            }})


        })

        this.btnClose.addEventListener('click', () => {
            this.view.querySelector('.player').classList.remove('is-playing');
            this.view.querySelector('video').pause();

            gsap.to(this.wrap, {opacity: 0, duration: .4, pointerEvents: "none", onComplete: () => {
                gsap.to(this.curtain, {scale: 1, duration: .7, delay: .4, opacity: 1, onComplete: () => {
                    this.html.classList.toggle('is-video-open');
                }});
                gsap.to(this.bg, {filter: "blur(0px)", duration: .7, delay: .4});
            }});

        })
    }
}