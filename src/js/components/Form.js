import { gsap } from "gsap";
// import { breakpoint } from './Breakpoint.js';
import $ from "jquery";
import { browser } from './Browsers.js';
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
                if(!browser.mobile) {
                    this.insertTime();
                }
                this.picker.classList.add('is-started');
            });
        }

        const time = document.querySelector('.input--time input');
        if(browser.mobile && time) {
            const timeInside = document.querySelector('.datepicker__time .time');

            time.addEventListener('click', () => {
                time.parentElement.classList.add('is-active');
            })



            // timeInside.addEventListener('click', () => {
            //     time.click();
            // })
        }
    }


    validate() {
        const form = document.getElementById('form');
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('number');
        const company = document.getElementById('company');
        const check = document.getElementById('privacy');
        const date = document.querySelector('#datepicker input');
        const time = document.querySelector('.input--time input');



        if(time) {

            time.addEventListener('click', (e) => {

                if(!browser.mobile) {
                    this.insertTime();
                }

                setTimeout(() => {
                    this.timeInput.focus();
                }, 10)
                this.picker.classList.add('is-started');
                document.querySelector('#datepicker input').focus();

            })




        }



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

        function checkDateTime(input) {
            if(input.value != '' && input.value != "00:00") {
                showSucces(input);
            } else {
                showError(input);
            }
        }

        form.addEventListener('submit',(e) => {
            e.preventDefault();

            //clear errors
            form.querySelectorAll('input').forEach(i => {
                i.parentElement.classList.remove('error', 'success');
            })

            if(phone) {
                validatePhoneNumber(phone);
            }

            isChecked(check);
            checkLength(name,3,15);
            checkLength(company,2,20);
            checkEmail(email);
            checkList();

            checkDateTime(date);
            checkDateTime(time);
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

        if(browser.mobile && document.querySelector('.input--time input').value) {
            document.querySelector('.input--time input').value
        }

        this.setTime();
        this.changeTimeFormat();
    }

    setTime() {
        const timeInputInside = this.view.querySelector('input[type=time]');
        this.timeInput = document.querySelector('.datepicker__time .time')
        this.timeInput.addEventListener('click', () => {
            setTimeout(() => {
                this.timeInput.focus();
            }, 10)
        })

        this.timeInput.addEventListener('input', () => {
            timeInputInside.value = this.timeInput.value;

            timeInputInside.parentElement.classList.remove('error');
            timeInputInside.parentElement.classList.add('is-active');
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