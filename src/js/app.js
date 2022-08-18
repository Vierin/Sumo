import { Animations } from "./components/Animations.js";
import { SwiperSlider } from "./components/SwiperSlider.js";
import { SwiperMulti } from "./components/SwiperMulti.js";
import { Form } from './components/Form.js';
import { Hero } from './components/Hero.js';
import { Lines } from './components/Lines.js';
import { Bubles } from './components/Bubles.js';
import { getBrowser } from './components/Browsers.js';
import { Sticky } from './components/Sticky.js';

import { gsap } from "gsap";
// import ScrollTrigger from "gsap/src/ScrollTrigger.js";
export class Page {
    constructor() {
        this.load();
    }

    load() {
        window.addEventListener('load', () => {
            this.setComponents();
            new Animations();

            if(window.ontouchstart === undefined) {
                document.querySelector('html').classList.add('mod_no-touchevents');
            }
        });


    }

    setComponents() {
        getBrowser();

        //components
        new SwiperSlider();
        new SwiperMulti();
        this.changeLogo();
        this.backToTop();
        this.scrollDown();
        new Form();
        new Hero();
        new Lines();
        new Lines();
        new Bubles();
        new Sticky();


        this.isSafari = document.documentElement.classList.contains('safari');
        const circles = document.querySelectorAll('.js-circle');
        circles.forEach(circle => {
            this.moveCircle(circle);
        });

        this.animateCircleArr();
    }

    animateCircleArr() {
        const circleWrap = document.querySelector('.js-svg-circle');
        // const bg =
        const circle = circleWrap.querySelector('circle');
        const l = circle.getTotalLength();

        gsap.set(circle, {strokeDasharray: l});
        gsap.timeline({repeat: -1})
            .fromTo(circle, {strokeDashoffset: l, rotate: 0}, {strokeDashoffset: 0, rotate: 360, duration: 5, transformOrigin: "50% 50%", ease: "power2.inOut"});
    }

    moveCircle(circle) {
        this.isSafari
        const el = this.isSafari ? circle.querySelector('.circle__svg') : circle.querySelector('span');
        let startX,
            startY,
            startBlur = circle.dataset.blur;

        circle.addEventListener('mouseenter', (e) => {
            startX = e.clientX;
            startY = e.clientY;
        })

        circle.addEventListener('mouseout', (e) => {
            gsap.to(el, {
                x: 0,
                y: 0,
                scale: 1,
                filter: !this.isSafari ? `blur(${startBlur}px)` : 'none',
                duration: 1
            })
        })

        circle.addEventListener('mousemove', (e) => {
            let x = e.clientX - startX;
            let y = e.clientY - startY;

            gsap.to(el, {
                x: x * .3,
                y: y * .3,
                scale: !this.isSafari ? .8 : 1,
                filter: !this.isSafari ? `blur(${startBlur * .5}px)` : 'none'
            })
        })
    }

    scrollDown() {
        document.querySelector('.js-arr-down').addEventListener('click', () => {
            if(!document.documentElement.classList.contains('is-scrolled')) {
                window.scrollBy({
                    top: 100,
                    left: 0,
                    behavior : "smooth"
                })
            } else {
                document.getElementById("circles").scrollIntoView({behavior: "smooth"});
            }


        })
    }

    backToTop() {
        document.querySelector('.js-arr-back').addEventListener('click', () => {
            window.scroll({
                top: 0,
                left: 0,
            });
        })
    }

    changeLogo() {

        const header = document.querySelector('.js-header');
        const darks = document.querySelectorAll('.js-dark');

        darks.forEach((section) => {
            gsap.to(section, {
              scrollTrigger: {
                trigger: section,
                markers: false,
                start: `top 35px`,
                end: `bottom top` ,
                onToggle: self => {
                    if(self.isActive) {
                        header.classList.add('is-section-dark');
                    } else {
                        header.classList.remove('is-section-dark');
                    }
                }
              }
            });
          });
    }

}


new Page();