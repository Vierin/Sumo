import { gsap } from "gsap";
// import { breakpoint } from './Breakpoint.js';
import $ from "jquery";
// import * as datapicker from "bootstrap-datepicker";

export class Form {
    constructor() {
        this.view = document.querySelector('[data-component="Form"]');

        if(this.view) {
            this.init();
            this.validate();
        }
    }


    init() {
        //close select
        this.view.querySelectorAll('.option').forEach(el => {
            el.addEventListener('click', () => {
                const select = this.view.querySelector('.custom-select');
                select.removeAttribute('open');
                select.classList.add('is-active');
            })
        })

        this.picker = document.querySelector('#datepicker');
        if(this.picker) {
            this.picker.querySelector('input').addEventListener('click', () => {
                this.insertTime();
                this.picker.classList.add('is-started');
            });
        }
    }


    validate() {
        const form = document.getElementById('form');
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('number');
        const company = document.getElementById('company');
        const check = document.getElementById('privacy');



        function showError(input) {
            const formControl = input.parentElement;
            formControl.classList.add('error');
        }

        function showSucces(input) {
            const formControl = input.parentElement;
            formControl.classList.add('success');
        }

        function validatePhoneNumber(input) {
            var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
            if(re.test(input.value.trim())) {
                showSucces(input)
            } else {
                showError(input);
            }
        }

        function checkEmail(input) {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(re.test(input.value.trim())) {
                showSucces(input)
            } else {
                showError(input);
            }
        }


        function checkLength(input, min ,max) {
            if(input.value.length < min) {
                showError(input);
            } else if(input.value.length > max) {
                showError(input);
            } else {
                showSucces(input);
            }
        }

        function isChecked(input) {
            if(input.checked) {
                showSucces(input);
            } else {
                showError(input);
            }
        }

        function checkList() {
            if ($('input[name=inter]:checked').length > 0 && $('input[name=inter]:checked').attr('id') != 'default') {
                $('input[name=inter]:checked').parent().addClass('succes');
            } else {
                $('input[name=inter]:checked').parent().addClass('error');
            }
        }

        form.addEventListener('submit',(e) => {
            e.preventDefault();

            //clear errors
            form.querySelectorAll('input').forEach(i => {
                i.parentElement.classList.remove('error', 'succes');
            })

            if(phone) {
                validatePhoneNumber(phone);
            }

            isChecked(check);
            checkLength(name,3,15);
            checkLength(company,2,20);
            checkEmail(email);
            checkList();
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
            })
        });
    }




}