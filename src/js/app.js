import { Animations } from "./components/Animations.js";
import { SwiperSlider } from "./components/SwiperSlider.js";
import { SwiperMulti } from "./components/SwiperMulti.js";

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
        this.changeLogo()
    }

    changeLogo() {
        const whites = [...document.querySelectorAll('.js-dark')].map(e => ({
            top: e.getBoundingClientRect().top,
            bottom: e.getBoundingClientRect().bottom
        }));


        // const blacks = [...document.querySelectorAll('.black')].map(e => ({top: e.top, bottom: e.bottom}));

        const logo = document.querySelector('.js-logo');

        document.addEventListener('scroll', () => {


            let position = (logo.getBoundingClientRect().bottom + logo.getBoundingClientRect().top) / 2 + window.scrollY;

            console.log(position);
            for (let i = 0; i < whites.length; i++) {
                if (position >= whites[i].top && position <= whites[i].bottom) {
                    logo.classList.remove('blackLogo');
                    logo.classList.add('whiteLogo');
                    return;
                }
            }

            logo.classList.remove('whiteLogo');
            logo.classList.add('blackLogo');
        });
    }

}


new Page();