import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/src/ScrollTrigger.js";
import { SplitText } from "gsap/dist/SplitText.min.js";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

ScrollTrigger.defaults({
    start: "top 90%"
});

export class Animations {

    constructor() {
        this.cache = {};
        this.load();
    }

    load() {
        this.animations = [];

        this.saveCache();
        this.setActions();
    }

    saveCache() {
        this.cache = [...document.querySelectorAll('[data-scroll]')].map((el) => {

            this.animations.push({
                el,
                done: el.classList.contains('is-animated'),
                type: el.dataset.scroll
            });
        });

        this.animations.forEach(item => {
            ScrollTrigger.create({
                trigger: item.el,
                onEnter: () => {
                    item.el.classList.add('is-animated');
                }
            })
        });

    }

    setActions() {
        this.animations.forEach(item => {

            switch (item.type) {

                case 'title':
                    const letters = new SplitText(item.el, {type: 'words, chars'})
                    const stagger = item.el.dataset.stagger;
                    gsap.from(letters.chars, {
                        scrollTrigger: {
                            trigger: item.el,
                        },
                        yPercent: 110,
                        stagger: stagger ? stagger : .04,
                    });
                    break;

                case 'lines':
                    const lines = new SplitText(item.el, {type: 'lines'})
                    gsap.from(lines.lines, {
                        scrollTrigger: {
                            trigger: item.el,
                        },
                        yPercent: 110,
                        stagger: .05
                    });
                    break;


                case 'line':
                    gsap.from(item.el, {
                        scrollTrigger: {
                            trigger: item.el,
                        },
                        scaleX: 0,
                        transformOrigin: "left",
                        duration: .7,
                        delay: .4
                    });
                    break;

                case 'fadeUp':
                    const delay = item.el.dataset.delay;

                    gsap.timeline({
                        scrollTrigger: {
                            trigger: item.el,
                        }})
                        .fromTo(item.el, { y: 40, opacity: 0 }, { duration: .5, y: 0, opacity: 1, delay: delay ? delay : 0});
                    break;

                case 'scroll':
                    const line = item.el.querySelector('span');

                    gsap.from(line, {
                        scrollTrigger: {
                            trigger: item.el,
                        },
                        scaleY: 0,
                        duration: .7,
                        transformOrigin: 'top',
                        duration: .3
                    });
                    break;

                case 'words':
                    const splitText = new SplitText(item.el, {type: 'lines, words', linesClass: "text-line"})

                    gsap.from(splitText.words, {
                        scrollTrigger: {
                            trigger: item.el,
                        },
                        yPercent: 120,
                        stagger: .04,
                    });
                    break;


                default:
                    if (item.type) {
                        console.warn(`There's no "${item.type}" scroll animation`);
                    }
                    break;
            }

        });
    }

}

