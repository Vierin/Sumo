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
        this.randomArr = [];
        this.bubles.forEach(bb => {
            this.randomArr.push(Math.random() - .5);
        });

        this.view.parentElement.addEventListener('mousemove', e => {
            this.bubles.forEach((bb, i) => {
                this.randomArr
                console.log(Math.random());
                const x = e.clientX * this.randomArr[i] * .5;
                const y = e.clientY * this.randomArr[i] * .5;
                gsap.to(bb, {x, y})
            });
        })
    }
}