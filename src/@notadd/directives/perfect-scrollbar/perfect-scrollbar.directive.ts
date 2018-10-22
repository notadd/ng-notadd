import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import PerfectScrollbar from 'perfect-scrollbar';
import * as _ from 'lodash';

import { NotaddConfigService } from '@notadd/services/config.service';

@Directive({
    selector: '[notaddPerfectScrollbar]'
})
export class NotaddPerfectScrollbarDirective implements AfterViewInit, OnDestroy {
    isInitialized: boolean;
    isMobile: boolean;
    ps: PerfectScrollbar;

    private _enabled: boolean | '';
    private _debouncedUpdate: any;
    private options: any;
    private ngUnsubscribe: Subject<any>;

    constructor(
        public elementRef: ElementRef,
        private platform: Platform,
        private router: Router,
        private configService: NotaddConfigService
    ) {
        this.isInitialized = false;
        this.isMobile = false;

        this._enabled = false;
        this._debouncedUpdate = _.debounce(this.update, 150);
        this.options = {
            updateOnRouteChange: false
        };
        this.ngUnsubscribe = new Subject();
    }

    @Input()
    set notaddPerfectScrollbarOptions(value) {
        this.options = _.merge({}, this.options, value);
    }

    get notaddPerfectScrollbarOptions(): any {
        return this.options;
    }

    @Input('notaddPerfectScrollbar')
    set enabled(value: boolean | '') {
        if (value === '') {
            value = true;
        }

        if (this.enabled === value) {
            return;
        }

        this._enabled = value;

        if (this.enabled) {
            this.init();
        } else {
            this.destroy();
        }
    }

    get enabled(): boolean | '' {
        return this._enabled;
    }

    ngAfterViewInit(): void {
        this.configService.config
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
                (settings) => {
                    this.enabled = settings.customScrollbars;
                }
            );

        if (this.notaddPerfectScrollbarOptions.updateOnRouteChange) {
            this.router.events
                .pipe(
                    takeUntil(this.ngUnsubscribe),
                    filter(event => event instanceof NavigationEnd)
                )
                .subscribe(() => {
                    setTimeout(() => {
                        this.scrollToTop();
                        this.update();
                    }, 0);
                });
        }
    }

    ngOnDestroy(): void {
        this.destroy();

        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    init(): void {
        if (this.isInitialized) {
            return;
        }

        if (this.platform.ANDROID || this.platform.IOS) {
            this.isMobile = true;
        }

        if (this.isMobile) {
            return;
        }

        this.isInitialized = true;

        this.ps = new PerfectScrollbar(this.elementRef.nativeElement, {
            ...this.notaddPerfectScrollbarOptions
        });
    }

    destroy(): void {
        if (!this.isInitialized || !this.ps) {
            return;
        }

        this.ps.destroy();

        this.ps = void (0);
        this.isInitialized = false;
    }

    @HostListener('window:resize')
    updateOnResize(): void {
        this._debouncedUpdate();
    }

    @HostListener('document:click', ['$event'])
    documentClick(event: Event): void {
        if (!this.isInitialized || !this.ps) {
            return;
        }

        this.ps.update();
    }

    update(): void {
        if (!this.isInitialized) {
            return;
        }

        this.ps.update();
    }

    destroyScrollbar(): void {
        this.ngOnDestroy();
    }

    scrollToX(x: number, speed?: number): void {
        this.animateScrolling('scrollLeft', x, speed);
    }

    scrollToY(y: number, speed?: number): void {
        this.animateScrolling('scrollTop', y, speed);
    }

    scrollToTop(offset?: number, speed?: number): void {
        this.animateScrolling('scrollTop', (offset || 0), speed);
    }

    scrollToLeft(offset?: number, speed?: number): void {
        this.animateScrolling('scrollLeft', (offset || 0), speed);
    }

    scrollToRight(offset?: number, speed?: number): void {
        const width = this.elementRef.nativeElement.scrollWidth;

        this.animateScrolling('scrollLeft', width - (offset || 0), speed);
    }

    scrollToBottom(offset?: number, speed?: number): void {
        const height = this.elementRef.nativeElement.scrollHeight;

        this.animateScrolling('scrollTop', height - (offset || 0), speed);
    }

    animateScrolling(target: string, value: number, speed?: number): void {
        if (!speed) {
            this.elementRef.nativeElement[target] = value;

            this.update();
            this.update();
        }
        else if (value !== this.elementRef.nativeElement[target]) {
            let newValue = 0;
            let scrollCount = 0;

            let oldTimestamp = performance.now();
            let oldValue = this.elementRef.nativeElement[target];

            const cosParameter = (oldValue - value) / 2;

            const step = (newTimestamp) => {
                scrollCount += Math.PI / (speed / (newTimestamp - oldTimestamp));

                newValue = Math.round(value + cosParameter + cosParameter * Math.cos(scrollCount));

                if (this.elementRef.nativeElement[target] === oldValue) {
                    if (scrollCount >= Math.PI) {
                        this.elementRef.nativeElement[target] = value;

                        this.update();

                        this.update();
                    } else {
                        this.elementRef.nativeElement[target] = oldValue = newValue;

                        oldTimestamp = newTimestamp;

                        window.requestAnimationFrame(step);
                    }
                }
            };

            window.requestAnimationFrame(step);
        }
    }
}
