import { gsap } from "gsap";
import MotionPathPlugin from "gsap/src/MotionPathPlugin.js";

gsap.registerPlugin(MotionPathPlugin);

export class Lines {
    constructor() {
        this.view = document.querySelector('[data-component="Lines"]');

        if(this.view) {
            this.init();
        }
    }




    init() {
        this.groups = this.view.querySelectorAll('.motion-group');

        this.groups.forEach((group, i) => {
            const path = group.querySelector('.motion-path');
            const line = group.querySelector('.motion-line');

            const tl = gsap.timeline({repeat: -1, delay: i * .8});
            tl
            // .fromTo(line, {opacity: 1},{opacity: 0, duration: .4})
            .from(line, {
                duration: 4,
                ease: "linear",
                motionPath: {
                    path: path,
                    align: path,
                    autoRotate: true,
                    // alignOrigin: [0.05, 0.1],
                    start: .5,
                    end: 0
                }
            }, `-=.4`)
            .to(line, {opacity: 0, duration: .6}, "-=.4")
        });






    }




}