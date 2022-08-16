import { gsap } from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

export class Bubles {
    constructor() {
        this.view = document.querySelector('[data-component="Bubles"]');

        if(this.view) {
            this.init();
        }
    }


    init() {
        this.bubles = this.view.querySelectorAll('.buble');


        this.bubles.forEach(bb => {
            const random = gsap.utils.random(-300, 300);
            ScrollTrigger.create({
                trigger: this.view,
                markers: true,
                onUpdate: self => {
                    gsap.set(bb, {y: self.progress * random, transformOrigin: "50% 50%"})
                }
            })
        });


    }

}