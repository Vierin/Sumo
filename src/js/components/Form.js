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
        const box = document.querySelector('.datepicker-days');

        if(!this.picker.classList.contains('is-started')) {
            box.insertAdjacentHTML('beforeend' , `
                <div class="datepicker__time">
                    <p>Time</p>
                    <input class="time" type="time" name="time" value="00:00" min="00:00" max="12:59" required/>
                    <div class="time-format">
                        <input type="radio" id="time-am" name="format" value="am" />
                        <label for="time-am">AM</label>
                        <input type="radio" id="time-pm" name="format" value="pm" checked/>
                        <label for="time-pm">PM</label>
                    </div>
                </div>
            `)
        }

        this.setTime();
        this.changeTimeFormat();

    }

    setTime() {
        const timeInputInside = this.view.querySelector('input[type=time]');
        const timeInput = document.querySelector('.datepicker__time .time')
        timeInput.addEventListener('click', () => {
            setTimeout(() => {
                timeInput.focus();
            }, 10)
        })

        timeInput.addEventListener('input', () => {
            timeInputInside.value = timeInput.value;

        })
    }


    changeTimeFormat() {
        const radios = document.querySelectorAll('.time-format label');

        radios.forEach(el => {


            el.addEventListener('click', () => {
                const input = el.previousSibling.previousSibling;
                input.checked = true;

                console.log();
                // const parent = el.parentElement
                // parent.classList.remove('is-pm')
                // parent.classList.add('')
            })
        });
    }




}