import { gsap } from "gsap";

export class Loader {
    constructor() {
        this.loader = document.querySelector('.js-loader');
        this.curtain = document.querySelector('.js-main-curtain');

        this.init();
    }


    init() {
        this.balls = this.loader.querySelectorAll('.ball');

        gsap.to(this.balls, {opacity: 1, stagger: .1, duration: .3});

        this.loadingCheck();
    }

    loadingCheck() {
        setTimeout(() => {
            if(!document.body.classList.contains('is-loading')) {
                this.animationOut()
            } else {
                this.loadingCheck();
            }
        }, 2000)
    }

    animationOut() {
        gsap.to(this.balls, {opacity: 0, stagger: .1, duration: .2, onComplete: () => {
            gsap.to([this.loader, this.curtain], {yPercent: 100, duration: 1, ease: "power3.out"});
        }});
    }
}