import { gsap } from "gsap";


export class Player {
    constructor(view) {
        this.view = view;

        this.init();
    }


    init() {
        this.video = this.view.querySelector('video');
        this.player = this.view.querySelector('.js-player');


        this.setTime();

        this.player.addEventListener("click", () => {
            this.view.classList.toggle('is-playing');

            if(this.view.classList.contains('is-playing')) {
                this.video.play();
            } else {
                this.video.pause();
            }

        })
    }

    setTime() {
        const duration = this.view.querySelector('.js-player-all');
        const info = this.view.querySelector('.js-player-info');
        const currentTime = this.view.querySelector('.js-player-curr');

        this.toNormalTime(this.video.duration, duration);
        this.toNormalTime(this.video.duration, info);

        this.video.addEventListener('timeupdate', () => {
            this.toNormalTime(this.video.currentTime, currentTime);
            this.setProgress(this.video.currentTime, this.video.duration);
        })

        this.video.addEventListener('ended', () => {
            this.video.currentTime = 0;
            this.view.classList.remove('is-playing');
        })
    }


    setProgress(currTime, allTime) {
        const progress = this.view.querySelector('.js-player-progress');
        const progressBar = this.view.querySelector('.js-player-progress span');

        const difference = progress.clientWidth / allTime;
        gsap.set(progressBar, {width: currTime * difference});
    }

    toNormalTime(time, place) {
        const minutes = parseInt(time / 60, 10);
		const seconds = Math.round(time % 60).toString().padStart(2, "0");

        place.innerHTML = `${minutes}:${seconds}`;
    }
}