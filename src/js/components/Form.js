import { gsap } from "gsap";
// import { breakpoint } from './Breakpoint.js';
import $ from "jquery";
// import * as datapicker from "bootstrap-datepicker";

export class Form {
    constructor() {
        this.view = document.querySelector('[data-component="Form"]');

        if(this.view) {
            this.init();
        }
    }


    init() {
        this.inputs = this.view.querySelectorAll('input');

        this.inputs.forEach(inp => {
            console.log(inp.value);
        });

        this.select();
    }


    select() {
        this.view.
    }




}