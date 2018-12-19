import { AfterViewInit, Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';

import { Observable, Subscription, fromEvent, of } from 'rxjs';
import { filter, map, pairwise, startWith } from 'rxjs/operators';

import { ScrollPosition } from './scroll-position';

@Directive({
    selector: '[notaddInfiniteScrollable]'
})
export class NotaddInfiniteScrollableDirective implements AfterViewInit {

    readonly defaultScrollPosition: ScrollPosition;

    private scrollEvent: Observable<UIEvent>;

    private userScrolledDown: Observable<ScrollPosition>;

    private emitOnScroll: Observable<ScrollPosition>;

    /* 触发滚动完成事件的滚动百分比 */
    @Input()
    public scrollPercent: number;

    /* 指令初始化后是否立即触发滚动完成事件 */
    @Input()
    public immediateEmit: boolean;

    /* 滚动完成事件 */
    @Output()
    public scrollComplete: EventEmitter<void>;

    constructor(
        private elementRef: ElementRef
    ) {
        this.defaultScrollPosition = {
            scrollHeight: 0,
            scrollTop: 0,
            clientHeight: 0
        };
        this.scrollPercent = 70;
        this.immediateEmit = false;
        this.scrollComplete = new EventEmitter<void>();
    }

    ngAfterViewInit() {
        this.registerScrollEvent();

        this.streamScrollEvents();

        this.emitScrollCompleteEvent();
    }

    /* 监听元素的滚动事件 */
    private registerScrollEvent(): void {
        this.scrollEvent = fromEvent(this.elementRef.nativeElement, 'scroll');
    }

    /* 处理滚动事件流，当滚动到给定的容器高度百分比时返回 */
    private streamScrollEvents(): void {
        this.userScrolledDown = this.scrollEvent
            .pipe(
                map(({ target }: any): ScrollPosition => ({
                    scrollHeight: target.scrollHeight,
                    scrollTop: target.scrollTop,
                    clientHeight: target.clientHeight
                })),
                pairwise(),
                filter(positions => this.isUserScrollingDown(positions) && this.isScrollExpectedPercent(positions[1])),
                map(positions => positions[1])
            );
    }

    /* 触发滚动完成事件 */
    private emitScrollCompleteEvent(): void {
        this.emitOnScroll = this.userScrolledDown;

        if (this.immediateEmit) {
            this.emitOnScroll = this.emitOnScroll
                .pipe(
                    startWith(this.defaultScrollPosition)
                );
        }

        this.emitOnScroll
            .subscribe(() => this.scrollComplete.emit());
    }

    private isUserScrollingDown = (positions): boolean => {
        return positions[0].scrollTop < positions[1].scrollTop;
    }

    private isScrollExpectedPercent = (position): boolean => {
        return ((position.scrollTop + position.clientHeight) / position.scrollHeight) > (this.scrollPercent / 100);
    }
}
