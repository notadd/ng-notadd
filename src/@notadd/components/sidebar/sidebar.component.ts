import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    RendererStyleFlags2,
    ViewEncapsulation
} from '@angular/core';
import { animate, AnimationBuilder, AnimationPlayer, style } from '@angular/animations';
import { ObservableMedia } from '@angular/flex-layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NotaddSidebarService } from './sidebar.service';
import { NotaddMatchMediaService } from '@notadd/services/match-media.service';
import { NotaddConfigService } from '@notadd/services/config.service';

@Component({
    selector: 'notadd-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NotaddSidebarComponent implements OnInit, OnDestroy {

    @Input()
    name: string;

    @Input()
    key: string;

    @Input()
    position: 'left' | 'right';

    @HostBinding('class.open')
    opened: boolean;

    @Input()
    lockedOpen: string;

    @HostBinding('class.locked-open')
    isLockedOpen: boolean;

    @Input()
    collapseWidth: number;

    @Input()
    collapseAutoTriggerOnHover: boolean;

    @HostBinding('class.expanded')
    expanded: boolean;

    @Input()
    invisibleOverlay: boolean;

    @Output()
    collapseChanged: EventEmitter<boolean>;

    @Output()
    openedChanged: EventEmitter<boolean>;

    private _collapsed: boolean;
    private notaddConfig: any;
    private wasActive: boolean;
    private wasCollapsed: boolean;
    private backdrop: HTMLElement | undefined = void (0);
    private player: AnimationPlayer;
    private ngUnsubscribe: Subject<any>;

    @HostBinding('class.animations-enabled')
    private animationsEnabled: boolean;

    constructor(
        private animationBuilder: AnimationBuilder,
        private changeDetectorRef: ChangeDetectorRef,
        private elementRef: ElementRef,
        private observableMedia: ObservableMedia,
        private renderer: Renderer2,
        private sidebarService: NotaddSidebarService,
        private matchMediaService: NotaddMatchMediaService,
        private configService: NotaddConfigService
    ) {
        this.collapseAutoTriggerOnHover = true;
        this.collapseWidth = 64;
        this.collapseChanged = new EventEmitter();
        this.openedChanged = new EventEmitter();
        this.opened = false;
        this.position = 'left';
        this.invisibleOverlay = false;

        this.animationsEnabled = false;
        this.collapsed = false;
        this.ngUnsubscribe = new Subject();
    }

    /**
     * 折叠
     *
     * @param {boolean} value
     */
    @Input()
    set collapsed(value: boolean) {
        this._collapsed = value;

        if (!this.opened) {
            return;
        }

        // 改变padding位置
        let sibling,
            styleRule;

        const styleValue = this.collapseWidth + 'px';

        if (this.position === 'left') {
            sibling = this.elementRef.nativeElement.nextElementSibling;
            styleRule = 'padding-left';
        }
        else {
            sibling = this.elementRef.nativeElement.previousElementSibling;
            styleRule = 'padding-right';
        }

        if (!sibling) {
            return;
        }

        // 折叠
        if (value) {
            this.collapse();

            // 设置折叠宽度
            this.renderer.setStyle(this.elementRef.nativeElement, 'width', styleValue);
            this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', styleValue);
            this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', styleValue);

            // 设置style和class
            this.renderer.setStyle(sibling, styleRule, styleValue, RendererStyleFlags2.Important + RendererStyleFlags2.DashCase);
            this.renderer.addClass(this.elementRef.nativeElement, 'folded');
        } else {
            this.expand();

            // 移除折叠宽度
            this.renderer.removeStyle(this.elementRef.nativeElement, 'width');
            this.renderer.removeStyle(this.elementRef.nativeElement, 'min-width');
            this.renderer.removeStyle(this.elementRef.nativeElement, 'max-width');

            // 移除styly和class
            this.renderer.removeStyle(sibling, styleRule);
            this.renderer.removeClass(this.elementRef.nativeElement, 'folded');
        }

        // 触发'collapseChanged'事件
        this.collapseChanged.emit(this.collapsed);
    }

    get collapsed(): boolean {
        return this._collapsed;
    }

    ngOnInit() {
        this.configService.config
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((config) => {
                this.notaddConfig = config;
            });

        this.sidebarService.register(this.name, this);

        this.setupVisibility();

        this.setupPosition();

        this.setupLockedOpen();

        this.setupCollapsed();
    }

    ngOnDestroy(): void {
        if (this.collapsed) {
            this.expand();
        }

        this.sidebarService.unregister(this.name);

        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    private setupVisibility(): void {
        this.renderer.setStyle(this.elementRef.nativeElement, 'box-shadow', 'none');

        this.renderer.setStyle(this.elementRef.nativeElement, 'visibility', 'hidden');
    }

    private setupPosition(): void {
        if (this.position === 'right') {
            this.renderer.addClass(this.elementRef.nativeElement, 'right-positioned');
        }
        else {
            this.renderer.addClass(this.elementRef.nativeElement, 'left-positioned');
        }
    }

    private setupLockedOpen(): void {
        if (!this.lockedOpen) {
            return;
        }

        this.wasActive = false;

        this.wasCollapsed = this.collapsed;

        this.showSidebar();

        this.matchMediaService.onMediaChange
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {

                const isActive = this.observableMedia.isActive(this.lockedOpen);

                if (this.wasActive === isActive) {
                    return;
                }

                if (isActive) {
                    this.isLockedOpen = true;

                    this.showSidebar();

                    this.opened = true;

                    this.openedChanged.emit(this.opened);

                    if (this.wasCollapsed) {
                        this.enableAnimations();

                        this.collapsed = true;

                        this.changeDetectorRef.markForCheck();
                    }

                    this.hideBackdrop();
                }
                else {
                    this.isLockedOpen = false;

                    this.expand();

                    this.opened = false;

                    this.openedChanged.emit(this.opened);

                    this.hideSidebar();
                }

                this.wasActive = isActive;
            });
    }

    private setupCollapsed(): void {
        if (!this.collapsed) {
            return;
        }

        if (!this.opened) {
            return;
        }

        let sibling,
            styleRule;

        const styleValue = this.collapseWidth + 'px';

        if (this.position === 'left') {
            sibling = this.elementRef.nativeElement.nextElementSibling;
            styleRule = 'padding-left';
        }
        else {
            sibling = this.elementRef.nativeElement.previousElementSibling;
            styleRule = 'padding-right';
        }

        if (!sibling) {
            return;
        }

        this.collapse();

        this.renderer.setStyle(this.elementRef.nativeElement, 'width', styleValue);
        this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', styleValue);
        this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', styleValue);

        this.renderer.setStyle(sibling, styleRule, styleValue, RendererStyleFlags2.Important + RendererStyleFlags2.DashCase);
        this.renderer.addClass(this.elementRef.nativeElement, 'collapsed');
    }

    private showBackdrop(): void {
        this.backdrop = this.renderer.createElement('div');

        this.backdrop.classList.add('notadd-sidebar-overlay');

        if (this.invisibleOverlay) {
            this.backdrop.classList.add('notadd-sidebar-overlay-invisible');
        }

        this.renderer.appendChild(this.elementRef.nativeElement.parentElement, this.backdrop);

        this.player =
            this.animationBuilder
                .build([
                    animate('300ms ease', style({opacity: 1}))
                ]).create(this.backdrop);

        this.player.play();

        this.backdrop.addEventListener('click', () => {
                this.close();
            }
        );

        this.changeDetectorRef.markForCheck();
    }

    private hideBackdrop(): void {
        if (!this.backdrop) {
            return;
        }

        this.player =
            this.animationBuilder
                .build([
                    animate('300ms ease', style({opacity: 0}))
                ]).create(this.backdrop);

        this.player.play();

        this.player.onDone(() => {

            if (this.backdrop) {
                this.backdrop.parentNode.removeChild(this.backdrop);
                this.backdrop = void (0);
            }
        });

        this.changeDetectorRef.markForCheck();
    }

    private showSidebar(): void {
        this.renderer.removeStyle(this.elementRef.nativeElement, 'box-shadow');

        this.renderer.removeStyle(this.elementRef.nativeElement, 'visibility');

        this.changeDetectorRef.markForCheck();
    }

    private hideSidebar(delay = true): void {
        const delayAmount = delay ? 300 : 0;

        setTimeout(() => {

            this.renderer.setStyle(this.elementRef.nativeElement, 'box-shadow', 'none');

            this.renderer.setStyle(this.elementRef.nativeElement, 'visibility', 'hidden');
        }, delayAmount);

        this.changeDetectorRef.markForCheck();
    }

    private enableAnimations(): void {
        if (this.animationsEnabled) {
            return;
        }

        this.animationsEnabled = true;

        this.changeDetectorRef.markForCheck();
    }

    open(): void {
        if (this.opened || this.isLockedOpen) {
            return;
        }

        this.enableAnimations();

        this.showSidebar();

        this.showBackdrop();

        this.opened = true;

        this.openedChanged.emit(this.opened);

        this.changeDetectorRef.markForCheck();
    }

    close(): void {
        if (!this.opened || this.isLockedOpen) {
            return;
        }

        this.enableAnimations();

        this.hideBackdrop();

        this.opened = false;

        this.openedChanged.emit(this.opened);

        this.hideSidebar();

        this.changeDetectorRef.markForCheck();
    }

    toggleOpen(): void {
        if (this.opened) {
            this.close();
        }
        else {
            this.open();
        }
    }

    @HostListener('mouseenter')
    onMouseEnter(): void {
        if (!this.collapseAutoTriggerOnHover) {
            return;
        }

        this.expandTemporarily();
    }

    @HostListener('mouseleave')
    onMouseLeave(): void {
        if (!this.collapseAutoTriggerOnHover) {
            return;
        }

        this.collapseTemporarily();
    }

    collapse(): void {
        if (this.collapsed) {
            return;
        }

        this.enableAnimations();

        this.collapsed = true;

        this.changeDetectorRef.markForCheck();
    }

    expand(): void {
        if (!this.collapsed) {
            return;
        }

        this.enableAnimations();

        this.collapsed = false;

        this.changeDetectorRef.markForCheck();
    }

    toggleFold(): void {
        if (this.collapsed) {
            this.expand();
        }
        else {
            this.collapse();
        }
    }

    collapseTemporarily(): void {
        if (!this.collapsed) {
            return;
        }

        this.enableAnimations();

        this.expanded = false;

        const styleValue = this.collapseWidth + 'px';

        this.renderer.setStyle(this.elementRef.nativeElement, 'width', styleValue);
        this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', styleValue);
        this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', styleValue);

        this.changeDetectorRef.markForCheck();
    }

    expandTemporarily(): void {
        if (!this.collapsed) {
            return;
        }

        this.enableAnimations();

        this.expanded = true;

        this.renderer.removeStyle(this.elementRef.nativeElement, 'width');
        this.renderer.removeStyle(this.elementRef.nativeElement, 'min-width');
        this.renderer.removeStyle(this.elementRef.nativeElement, 'max-width');

        this.changeDetectorRef.markForCheck();
    }
}
