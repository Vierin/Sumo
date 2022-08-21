import { gsap } from "gsap";

export class Bubles {
    constructor() {
        this.view = document.querySelector('[data-component="Bubles"]');

        if(this.view) {
            this.init();
        }
    }


    init() {
        this.bubles = this.view.querySelectorAll('.buble');
        // this.randomArr = [];
        // this.bubles.forEach(bb => {
        //     this.randomArr.push(Math.random() - .5);
        // });

        // this.view.parentElement.addEventListener('mousemove', e => {
        //     this.bubles.forEach((bb, i) => {
        //         const x = e.clientX * this.randomArr[i] * .5;
        //         const y = e.clientY * this.randomArr[i] * .5;
        //         gsap.to(bb, {x, y})
        //     });
        // })

        this.bubles.forEach(bb => {

            gsap.timeline({repeat: -1})
                .fromTo(bb, {y: 0}, { y: "random(-40, 40)", delay: 0, ease: "sine.inOut", duration:  0.8 + Math.random() * .5})
                .to(bb, {y: "random(-40, 40)", ease: "sine.inOut", duration: 0.8 + Math.random() * .5})
                .to(bb, {y: "random(-40, 40)", ease: "sine.inOut", duration: 0.8 + Math.random() * .5})
                .to(bb, {y: "random(-40, 40)", ease: "sine.inOut", duration: 0.8 + Math.random() * .5})
                .to(bb, {y: "random(-40, 40)", ease: "sine.inOut", duration: 0.8 + Math.random() * .5})
                .to(bb, {y: 0, ease: "sine", duration: 0.4 + Math.random() * .5});

            gsap.timeline({repeat: -1})
                .fromTo(bb, {x: 0}, {x: "random(-40, 40)", delay: 0, ease: "sine.inOut", duration:  1 + Math.random() * .3})
                .to(bb, {x: "random(-40, 40)", ease: "sine.inOut", duration: 1 + Math.random() * .3})
                .to(bb, {x: "random(-40, 40)", ease: "sine.inOut", duration: 1 + Math.random() * .3})
                .to(bb, {x: "random(-40, 40)", ease: "sine.inOut", duration: 1 + Math.random() * .3})
                .to(bb, {x: "random(-40, 40)", ease: "sine.inOut", duration: 1 + Math.random() * .3})
                .to(bb, {x: 0, ease: "sine", duration: 0.5 + Math.random() * .3});
        });
    }
}