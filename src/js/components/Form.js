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
            // console.log(inp.value);
        });

        // this.select();
        this.picker = document.querySelector('#datepicker')
        this.picker.querySelector('input').addEventListener('click', () => {
            this.insertTime();
            this.picker.classList.add('is-started');
        });

    }

    insertTime() {
        const box = document.querySelector('.datepicker-days table');

        if(!this.picker.classList.contains('is-started')) {
            box.insertAdjacentHTML('beforeend' , `
                <div class="datepicker__time">
                    <p>Time</p>
                    <input class="time" type="time" name="time" value="00:00" required/>
                    <div class="time-format">
                        <input type="radio" id="time-am" name="time-format" value="am" checked/>
                        <label for="time-am">AM</label>
                        <input type="radio" id="time-pm" name="time-format" value="pm"/>
                        <label for="time-pm">PM</label>
                    </div>
                </div>
            `)
        }




        document.querySelectorAll('.time-format label')[1].addEventListener('click', () => {
            // alert(123)
        })
        console.log(box);
    }


    // select() {
    //     this.view.
    // }




}