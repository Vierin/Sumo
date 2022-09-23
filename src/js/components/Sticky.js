import { gsap } from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger.js";
import { browser } from './Browsers.js';

export class Sticky {
    constructor() {
        this.els = document.querySelectorAll('[data-sticky]');


        if(this.els.length > 0 && !browser.mobile) {
            this.init();
        }
    }


    init() {

        this.els.forEach(el => {
            ScrollTrigger.create({
                trigger: el,
                markers: false,
                start: "top 16px",
                end: "87% 20px",
                pin: true
            })
        });

    }
}