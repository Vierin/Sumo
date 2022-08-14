import { gsap } from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

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

        ScrollTrigger.create({
            trigger: this.view,
            markers: false,
            pin: true,
            start: "top top",
            end: "75% center",
            onUpdate: self => {
                if(self.progress > 0.03) {
                    if(!html.classList.contains('is-scrolled')) {
                        html.classList.add('is-scrolling', 'is-scrolled');
                    }
                    document.querySelector('.js-header').classList.remove('is-section-white');
                    gsap.to(this.head, {yPercent: -100, opacity: .5, duration});
                    ScrollTrigger.refresh(true);
                    gsap.to(this.intro, {yPercent: 0, opacity: 1, duration, onComplete: () => {
                        setTimeout(() => {
                            html.classList.remove('is-scrolling');
                            // ScrollTrigger.refresh(true);
                        }, 400)
                    }});
                } else if(self.progress < 0.03) {
                    html.classList.remove('is-scrolling', 'is-scrolled');
                    gsap.to(this.head, {yPercent: 0, opacity: 1, duration});
                    gsap.to(this.intro, {yPercent: 10, opacity: 0, duration});
                    document.querySelector('.js-header').classList.add('is-section-white');
                }

            }
        })

        this.moveCircle();
    }


    moveCircle() {
        const area = this.view.querySelector('.js-area');
        const circle = this.view.querySelector('.js-circle-area');

        // console.log(circle);
        const half = circle.clientWidth * .5;
        const startTop = circle.offsetTop;
        const startLeft = circle.offsetLeft;

    //    console.log(startTop, startLeft);

        area.addEventListener('mouseout', (e) => {
            gsap.to(circle, {top: startTop + "px", left: startLeft + "px"})

        })

        area.addEventListener('mousemove', (e) => {
            let x = e.clientX - half;
            let y = e.clientY - half;
            gsap.to(circle, {top: y + "px", left: x + "px"})
        })
    }


}