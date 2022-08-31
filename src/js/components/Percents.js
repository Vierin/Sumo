import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/src/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

export class Percents {
    constructor() {
        this.view = document.querySelector('[data-component="Percents"]');

        if(this.view) {
            this.init();
        }
    }


    init() {
        //circle
        const circle = this.view.querySelector('.js-progress-circle .progress');
        const l = circle.getTotalLength();
        let isStarted = false;

        gsap.set(circle, {strokeDasharray: l, strokeDashoffset: l});

        ScrollTrigger.create({
            trigger: this.view,
            markers: false,
            start: "top center",
            end: "bottom center",
            onToggle: self => {
                if(self.isActive && !isStarted) {
                    gsap.fromTo(circle, {strokeDashoffset: l}, {strokeDashoffset: l * .38, duration: 15, transformOrigin: "50% 50%", ease: "linear"})
                    isStarted = true;
                }
            }
        })


        const bublesStart = this.view.querySelectorAll('.js-enter .js-circle');
        const bublesOut = this.view.querySelectorAll('.js-out .js-circle');
        const height = this.view.querySelector('.percents-round__circle').clientHeight;


        bublesStart.forEach((buble, id) => {
            gsap.timeline({repeat: -1, repeatDelay: 0})
                .to(buble, {x: height * .7, y: (height  * .5) * (Math.random() - .5), duration: 3, delay: id * .1})
                .to(buble, {opacity: 0, duration: .2}, '-=.2')
        });

        bublesOut.forEach((buble, id) => {
            gsap.timeline({repeat: -1, repeatDelay: 0})
                .from(buble, {x: height * .7, y: (height  * .5) * (Math.random() - .5), duration: 3, delay: id * .1})
        });





    }
}