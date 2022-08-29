import { gsap } from "gsap";

export class Menu {
    constructor() {
        this.view = document.querySelector('.js-menu');


        if(this.view) {
            this.init();
        }

    }

    init() {
        this.menuBtn = document.querySelector('.js-menu-btn');
        this.menuClose = document.querySelector('.js-menu-close');
        this.btnSearch = this.view.querySelector('.js-menu-search')
        this.search = this.view.querySelector('.js-search');

        this.curtain = this.view.querySelector('.curtain');

        this.menuBtn.addEventListener('click', () => {
            this.toggleMenu(true)
        })

        this.menuClose.addEventListener('click', () => {
            this.toggleMenu(false)
        })

        this.setSearch();
    }

    toggleMenu(show) {
        document.documentElement.classList.toggle('is-menu-open', show);

        if(show) {
            gsap.set(this.curtain, {opacity: 1});
            gsap.to(this.curtain, {width: 200 + "vw", height: 200 + "vw", duration: .5 })
        } else {
            this.searchClose()
            gsap.to(this.curtain, {width: 1, height: 1, duration: .5, onComplete: () => {
                gsap.set(this.curtain, {opacity: 1});
            }})
        }

    }

    setSearch() {
        //search
        this.searchInp = this.view.querySelector('.js-search-inp');
        this.searchBtn = this.view.querySelector('.js-search-btn');

        this.searchInp.addEventListener('input', e => {
            this.searchBtn.classList.toggle("not-empty", e.target.value != "")
        })

        this.startHeight = this.search.clientHeight;
        gsap.set(this.search, {height: 0, opacity: 0, pointerEvents: "none"});
        this.btnSearch.addEventListener('click', () => {
            this.btnSearch.classList.toggle('is-search-open');


            if(this.btnSearch.classList.contains('is-search-open')) {
                gsap.timeline()
                    .to(this.search, { height: this.startHeight, opacity: 1, pointerEvents: "all", transformOrigin: "top", duration: .4})
                    .to(this.search.children, { opacity: 1, duration: .3});
            } else {
                this.searchClose()
            }

        })
    }

    searchClose() {
        this.btnSearch.classList.remove('is-search-open');
        this.searchBtn.classList.remove('not-empty');
        this.searchInp.value = '';
        gsap.timeline()
            .to(this.search.children, { opacity: 0, duration: .2})
            .to(this.search, { height: 0, opacity: 0, pointerEvents: "none", transformOrigin: "top", duration: .3});
    }
}