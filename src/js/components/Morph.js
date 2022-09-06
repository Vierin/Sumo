import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin.js";

gsap.registerPlugin(MorphSVGPlugin);

export class Morph {
    constructor() {
        this.morphEls = document.querySelectorAll('.js-morph');

        this.init();
    }


    init() {

        this.morphEls.forEach(el => {

            const path = el.querySelector('.figure path');
            const pathTo = el.querySelector('.mask path');

            gsap.timeline({repeat: -1, repeatDelay: 0})
                .to(path, {duration: 2, morphSVG: pathTo})
                .to(path, {duration: 2, morphSVG: path})
        });
    }


}