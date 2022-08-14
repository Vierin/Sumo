import { Animations } from "./components/Animations.js";
import { SwiperSlider } from "./components/SwiperSlider.js";
import { SwiperMulti } from "./components/SwiperMulti.js";
import { Form } from './components/Form.js';
import { Hero } from './components/Hero.js';

import { gsap } from "gsap";
import ScrollTrigger from "gsap/src/ScrollTrigger.js";
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
        //components
        new SwiperSlider();
        new SwiperMulti();
        this.changeLogo();
        this.backToTop();
        this.scrollDown();
        new Form();
        new Hero();

        const circles = document.querySelectorAll('.js-circle');
        circles.forEach(circle => {
            this.moveCircle(circle);
        });

    }

    moveCircle(circle) {
        let startX,
            startY,
            startBlur = circle.dataset.blur;

        circle.addEventListener('mouseenter', (e) => {
            startX = e.clientX;
            startY = e.clientY;
        })

        circle.addEventListener('mouseout', (e) => {
            gsap.to(circle.querySelector('span'), {
                x: 0,
                y: 0,
                scale: 1,
                filter: `blur(${startBlur}px)`
            })
        })

        circle.addEventListener('mousemove', (e) => {
            let x = e.clientX - startX;
            let y = e.clientY - startY;

            console.log(circle.querySelector('span'));

            gsap.to(circle.querySelector('span'), {
                x: x * .3,
                y: y * .3,
                scale: .8,
                filter: `blur(${startBlur * .5}px)`
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
                behavior: 'smooth'
            });
        })
    }

    changeLogo() {

        const header = document.querySelector('.js-header');
        const whites = document.querySelectorAll('.js-white');

        whites.forEach((section) => {
            gsap.to(section, {
              scrollTrigger: {
                trigger: section,
                markers: false,
                start: `230px 35px`,
                end: `${section.clientHeight + 230}px top` ,
                onToggle: self => {
                    // ScrollTrigger.refresh(true);
                    if(self.isActive) {
                        header.classList.add('is-section-white');
                    } else {
                        header.classList.remove('is-section-white');
                    }

                }
              }
            });
          });





        // const blacks = [...document.querySelectorAll('.black')].map(e => ({top: e.top, bottom: e.bottom}));



        // document.addEventListener('scroll', () => {


        //     let position = (header.getBoundingClientRect().bottom + header.getBoundingClientRect().top) / 2 + window.scrollY;
        //     for (let i = 0; i < whites.length; i++) {
        //         if (position >= whites[i].top && position <= whites[i].bottom) {
        //             header.classList.remove('is-black');
        //             header.classList.add('is-white');
        //             return;
        //         }
        //     }

        //     header.classList.remove('is-white');
        //     header.classList.add('is-black');
        // });
    }

}


new Page();