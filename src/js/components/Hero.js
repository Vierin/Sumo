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

        this.moveCircle();

        const target = this.view.querySelector('.js-hero-intro').offsetTop;

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
                            if(window.innerHeight < 800) {
                                gsap.to(this.circle, {top: this.startTop + "px", left: this.startLeft + "px"})
                            }
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


    }


    moveCircle() {
        const area = this.view.querySelector('.js-area');
        this.circle = this.view.querySelector('.js-circle-area');

        this.startTop = this.circle.offsetTop;
        this.startLeft = this.circle.offsetLeft;

        const half = this.circle.clientWidth * .5;

        area.addEventListener('mousemove', (e) => {
            let x = e.clientX - half;
            let y = e.clientY - half;
            gsap.to(this.circle, {top: y + "px", left: x + "px"})
        })
    }


}