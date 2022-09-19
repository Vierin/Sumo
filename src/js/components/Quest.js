import { gsap } from "gsap";
import { browser } from './Browsers.js';
import ScrollTrigger from "gsap/src/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger)
export class Quest {
    constructor() {
        this.view = document.querySelector('[data-component="Quest"]');

        if(this.view) {
            this.init();
        }
    }


    init() {
        //circle
        const items = this.view.querySelectorAll('.js-quest-item');
        const circle = this.view.querySelector('.js-quest-circ circle');
        const btnRestart = this.view.querySelector('.js-quest-restart');

        const l = circle.getTotalLength();

        gsap.set(circle, {strokeDasharray: l, strokeDashoffset: l});


        const percents = [ 0, 0.82, 0.66, 0.5, 0.33, 0.18];

        items.forEach((el, id) => {
            el.addEventListener('mouseenter', () => {
                console.log();
                gsap.to(circle, {strokeDashoffset: l * percents[id], duration: 1, transformOrigin: "50% 50%", ease: "linear"})

            })
        });

        if(browser.mobile) {
            gsap.to(circle, {
                scrollTrigger: {
                    trigger: circle
                },
                strokeDashoffset: 0, duration: 2, transformOrigin: "50% 50%", ease: "linear"
            })
        }

        btnRestart.addEventListener('click', () => {
            gsap.to(circle, {strokeDashoffset: l, duration: 1, transformOrigin: "50% 50%", ease: "linear"});
        })
    }
}