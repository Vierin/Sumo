import { Animations } from "./components/Animations.js";
import { SwiperSlider } from "./components/SwiperSlider.js";
import { SliderCustom } from "./components/SliderCustom.js";
import { Form } from './components/Form.js';
import { Hero } from './components/Hero.js';
import { Lines } from './components/Lines.js';
import { Bubles } from './components/Bubles.js';
import { getBrowser } from './components/Browsers.js';
import { Sticky } from './components/Sticky.js';
import { WhatItems } from './components/WhatItems.js';

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
        new SliderCustom();
        new Form();
        new Hero();
        new Lines();
        new Bubles();
        new Sticky();
        new WhatItems();

        //group in one folder
        this.toggleMore();
        this.changeLogo();
        this.backToTop();
        this.scrollDown();
        this.animateCircleArr();

        this.isSafari = document.documentElement.classList.contains('safari');
        const circles = document.querySelectorAll('.js-circle');
        circles.forEach(circle => {
            this.moveCircle(circle);
        });
    }

    toggleMore() {
        const moreItems = document.querySelectorAll('[data-more]');


        moreItems.forEach(more => {
            const text = more.querySelector('.more__text');
            const btn = more.querySelector('.more__btn');
            const startHeight = text.clientHeight;

            btn.addEventListener('click', () => {
                if(!more.classList.contains('is-open')) {
                    more.classList.add('is-open');
                    gsap.timeline()
                        .to(btn, {marginTop: startHeight + 48, duration: .6})
                        .to(text.children, {opacity: 1, stagger: 0.1, duration: .3}, "-=.3")
                } else {
                    more.classList.remove('is-open');
                    gsap.timeline()
                        .to(text.children, {opacity: 0, duration: .2})
                        .to(btn, {marginTop: 32, duration: .4} )
                }


            })
        });
    }

    animateCircleArr() {
        const circlesWrap = document.querySelectorAll('.js-svg-circle');

        circlesWrap.forEach(wrap => {
            const circle = wrap.querySelector('circle');
            const arr = wrap.querySelector('.arr');
            const l = circle.getTotalLength();

            gsap.set(circle, {strokeDasharray: l});
            gsap.timeline({repeat: -1})
                .fromTo(circlesWrap, {opacity: 0}, {opacity: 1, duration: .3}, 0)
                .fromTo([circlesWrap], {rotate: 0}, {rotate: 360, duration: 5, ease: "power2.inOut"}, "-=.2")
                .fromTo(circle, {strokeDashoffset: 0}, {strokeDashoffset: l, duration: 5, transformOrigin: "50% 50%", ease: "power2.inOut"}, "-=5.2")
                .to(circlesWrap, {opacity: 0, duration: .3}, "-=1");
        });

    }

    moveCircle(circle) {
        // set position
        if(circle.hasAttribute("data-position")) {
            console.log(1);
            const positions = circle.dataset.position.split(", ");
            circle.style.top = positions[0] + "%";
            circle.style.left = positions[1] + "%";
        }
        // set position

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
        const arr = document.querySelector('.js-arr-down');
        !arr ? null : arr.addEventListener('click', () => {
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