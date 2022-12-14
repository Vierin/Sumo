import { gsap } from "gsap";
import MotionPathPlugin from "gsap/src/MotionPathPlugin.js";
import { browser } from './Browsers.js';

gsap.registerPlugin(MotionPathPlugin);

export class Lines {
    constructor() {

        if(!browser.mobile) {
            this.view = document.querySelector('[data-component="Lines"] .svg-chip-lines');
        } else {
            this.view = document.querySelector('[data-component="Lines"] .svg-chip-lines-m');
        }

        if(this.view) {
            this.init();
        }
    }




    init() {
        this.groups = this.view.querySelectorAll('.motion-group');


        this.groups.forEach((group, i) => {
            const path = group.querySelector('.motion-path');
            const line = group.querySelector('.motion-line');

            gsap.to(line, {x: 100})

            const tl = gsap.timeline({repeat: -1, delay: i * .8});
            tl
            .fromTo(line, {opacity: 0},{opacity: 1, duration: .4})
            .from(line, {
                duration: 4,
                ease: "linear",
                motionPath: {
                    path: path,
                    align: path,
                    autoRotate: true,
                    alignOrigin: i == 2 ? [0.5, 1.2] : null,
                    start: .5,
                    end: 0
                }
            }, `-=.4`)
            .to(line, {opacity: 0, duration: .6}, "-=.4")
        });






    }




}