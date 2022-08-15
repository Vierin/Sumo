import { gsap } from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger.js";
import ScrollToPlugin from 'gsap/src/ScrollToPlugin.js'

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

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

        const target = this.view.querySelector('.js-hero-intro').offsetTop;
        ///test
        let panels = gsap.utils.toArray(".js-section"),
            scrollTween;

        panels.forEach((panel, i) => {
            ScrollTrigger.create({
                trigger: panel,
                start: "top bottom",
                markers: false,
                end: "+=200%",
                onToggle: self => {
                    if(self.isActive && !scrollTween) {
                        if(self.trigger.classList.contains('js-dark')) {
                            document.querySelector('.js-header').classList.add('is-section-dark');
                            this.view.classList.add('is-active');
                        } else {
                            document.querySelector('.js-header').classList.remove('is-section-dark');
                            this.view.classList.remove('is-active');
                        }

                        scrollTween = gsap.to(window, {
                                scrollTo: {y: i * innerHeight, autoKill: false},
                                duration: 1,
                                onComplete: () => scrollTween = null,
                                overwrite: true
                        });
                    }
                }
            });
        });

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