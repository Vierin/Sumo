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
        });


    }

    setComponents() {
        //components
        new SwiperSlider();
        new SwiperMulti();
    }

}


new Page();