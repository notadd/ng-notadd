import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AnimationBuilder, animate, AnimationPlayer, style } from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NotaddLoadingService {

    loadingEl: any;
    player: AnimationPlayer;

    constructor(
        private animationBuilder: AnimationBuilder,
        @Inject(DOCUMENT) private document: any,
        private router: Router
    ) {
        this.init();
    }

    private init(): void {
        this.loadingEl = this.document.body.querySelector('#notadd-loading');

        // 在第一个NavigationEnd事件中隐藏
        if (this.loadingEl) {
            const hideOnLoad = this.router.events
                .pipe(filter(event => event instanceof NavigationEnd))
                .subscribe((event) => {
                    window.setTimeout(() => {
                        this.hide();

                        hideOnLoad.unsubscribe();
                    }, 0);
                });
        }
    }

    private playAnimation(type: 'show' | 'hide'): void {
        const metadata: any = {
            show: [
                style({opacity: '0', zIndex: '99999'}),
                animate('400ms ease', style({opacity: '1'}))
            ],
            hide: [
                style({opacity: '1'}),
                animate('400ms ease', style({opacity: '0', zIndex: '-10'}))
            ]
        };

        this.player = this.animationBuilder.build(metadata[type]).create(this.loadingEl);

        window.setTimeout(() => {
            this.player.play();
        }, 500);
    }

    show(): void {
        this.playAnimation('show');
    }

    hide(): void {
        this.playAnimation('hide');
    }
}
