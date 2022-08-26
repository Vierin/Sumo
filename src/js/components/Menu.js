import { gsap } from "gsap";

export class Menu {
    constructor() {
        this.view = document.querySelector('.js-menu');
        this.menuBtn = document.querySelector('.js-menu-btn');
        this.menuClose = document.querySelector('.js-menu-close');
        this.btnSearch = this.view.querySelector('.js-menu-search')
        this.search = this.view.querySelector('.js-search');

        // this.curtain = document.querySelector('.js-header .menu__curtain');

        this.menuBtn.addEventListener('click', () => {
            document.documentElement.classList.add('is-menu-open');
            // gsap.to(this.curtain, {width: 100 + "vw", right: 0, top: -30, height: 67 + "vh", zIndex: 1, duration: .7 })
        })

        this.menuClose.addEventListener('click', () => {
            document.documentElement.classList.remove('is-menu-open');
            this.searchClose()
        })

        this.init();
    }


    init() {
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