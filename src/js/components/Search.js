import { gsap } from "gsap";
import { browser } from './Browsers.js';


export class Search {
    constructor() {
        this.view = document.querySelector('[data-component="Search"]');


        if(this.view) {
            this.init();
        }

    }

    init() {
        this.search = this.view.querySelector('.js-search');

        this.setSearch();
    }



    setSearch() {
        //search
        this.searchInp = this.view.querySelector('.js-search-inp');
        this.searchBtn = this.view.querySelector('.js-search-btn');

        this.searchInp.addEventListener('input', e => {
            this.searchBtn.parentElement.classList.toggle("not-empty", e.target.value != "")
        })
    }

    searchClose() {
        this.searchBtn.parentElement.classList.remove('not-empty');
        this.searchInp.value = '';
    }
}