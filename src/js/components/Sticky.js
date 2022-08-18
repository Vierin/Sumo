import { gsap } from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger.js";

export class Sticky {
    constructor() {
        this.els = document.querySelectorAll('[data-sticky]');


        if(this.els.length > 0) {
            this.init();
        }
    }


    init() {

        this.els.forEach(el => {
            ScrollTrigger.create({
                trigger: el,
                markers: false,
                start: "top center",
                end: "90% center",
                pin: true
            })
        });

    }
}