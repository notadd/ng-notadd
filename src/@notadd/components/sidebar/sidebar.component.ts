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

    // Name
    @Input()
    name: string;

    // Key
    @Input()
    key: string;

    // Position
    @Input()
    position: 'left' | 'right';

    // Open
    @HostBinding('class.open')
    opened: boolean;

    // Locked Open
    @Input()
    lockedOpen: string;

    // isLockedOpen
    @HostBinding('class.locked-open')
    isLockedOpen: boolean;

    // collapsed width
    @Input()
    collapseWidth: number;

    // collapsed auto trigger on hover
    @Input()
    collapseAutoTriggerOnHover: boolean;

    // collapsed expanded
    @HostBinding('class.expanded')
    expanded: boolean;

    // Invisible overlay
    @Input()
    invisibleOverlay: boolean;

    // collapsed changed
    @Output()
    collapseChanged: EventEmitter<boolean>;

    // Opened changed
    @Output()
    openedChanged: EventEmitter<boolean>;

    // Private
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
        // Set the defaults
        this.collapseAutoTriggerOnHover = true;
        this.collapseWidth = 64;
        this.collapseChanged = new EventEmitter();
        this.openedChanged = new EventEmitter();
        this.opened = false;
        this.position = 'left';
        this.invisibleOverlay = false;

        // Set the private defaults
        this.animationsEnabled = false;
        this.collapsed = false;
        this.ngUnsubscribe = new Subject();
    }

    /**
     * collapsed
     *
     * @param {boolean} value
     */
    @Input()
    set collapsed(value: boolean) {
        // Set the collapse
        this._collapsed = value;

        // Return if the sidebar is closed
        if (!this.opened) {
            return;
        }

        // Programmatically add/remove padding to the element
        // that comes after or before based on the position
        let sibling,
            styleRule;

        const styleValue = this.collapseWidth + 'px';

        // Get the sibling and set the style rule
        if (this.position === 'left') {
            sibling = this.elementRef.nativeElement.nextElementSibling;
            styleRule = 'padding-left';
        }
        else {
            sibling = this.elementRef.nativeElement.previousElementSibling;
            styleRule = 'padding-right';
        }

        // If there is no sibling, return...
        if (!sibling) {
            return;
        }

        // If collapsed...
        if (value) {
            // collapse the sidebar
            this.collapse();

            // Set the collapsed width
            this.renderer.setStyle(this.elementRef.nativeElement, 'width', styleValue);
            this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', styleValue);
            this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', styleValue);

            // Set the style and class
            this.renderer.setStyle(sibling, styleRule, styleValue, RendererStyleFlags2.Important + RendererStyleFlags2.DashCase);
            this.renderer.addClass(this.elementRef.nativeElement, 'folded');
        }
        // If expanded...
        else {
            // expand the sidebar
            this.expand();

            // Remove the collapsed width
            this.renderer.removeStyle(this.elementRef.nativeElement, 'width');
            this.renderer.removeStyle(this.elementRef.nativeElement, 'min-width');
            this.renderer.removeStyle(this.elementRef.nativeElement, 'max-width');

            // Remove the style and class
            this.renderer.removeStyle(sibling, styleRule);
            this.renderer.removeClass(this.elementRef.nativeElement, 'folded');
        }

        // Emit the 'collapseChanged' event
        this.collapseChanged.emit(this.collapsed);
    }

    get collapsed(): boolean {
        return this._collapsed;
    }

    ngOnInit() {
        // Subscribe to config changes
        this.configService.config
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((config) => {
                this.notaddConfig = config;
            });

        // Register the sidebar
        this.sidebarService.register(this.name, this);

        // Setup visibility
        this.setupVisibility();

        // Setup position
        this.setupPosition();

        // Setup lockedOpen
        this.setupLockedOpen();

        // Setup folded
        this.setupCollapsed();
    }

    ngOnDestroy(): void {
        // If the sidebar is folded, unfold it to revert modifications
        if (this.collapsed) {
            this.expand();
        }

        // Unregister the sidebar
        this.sidebarService.unregister(this.name);

        // Unsubscribe from all subscriptions
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    /**
     * Setup the visibility of the sidebar
     *
     * @private
     */
    private setupVisibility(): void {
        // Remove the existing box-shadow
        this.renderer.setStyle(this.elementRef.nativeElement, 'box-shadow', 'none');

        // Make the sidebar invisible
        this.renderer.setStyle(this.elementRef.nativeElement, 'visibility', 'hidden');
    }

    /**
     * Setup the sidebar position
     *
     * @private
     */
    private setupPosition(): void {
        // Add the correct class name to the sidebar
        // element depending on the position attribute
        if (this.position === 'right') {
            this.renderer.addClass(this.elementRef.nativeElement, 'right-positioned');
        }
        else {
            this.renderer.addClass(this.elementRef.nativeElement, 'left-positioned');
        }
    }

    /**
     * Setup the lockedOpen handler
     *
     * @private
     */
    private setupLockedOpen(): void {
        // Return if the lockedOpen wasn't set
        if (!this.lockedOpen) {
            // Return
            return;
        }

        // Set the wasActive for the first time
        this.wasActive = false;

        // Set the wasCollapsed
        this.wasCollapsed = this.collapsed;

        // Show the sidebar
        this.showSidebar();

        // Act on every media change
        this.matchMediaService.onMediaChange
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {

                // Get the active status
                const isActive = this.observableMedia.isActive(this.lockedOpen);

                // If the both status are the same, don't act
                if (this.wasActive === isActive) {
                    return;
                }

                // Activate the lockedOpen
                if (isActive) {
                    // Set the lockedOpen status
                    this.isLockedOpen = true;

                    // Show the sidebar
                    this.showSidebar();

                    // Force the the opened status to true
                    this.opened = true;

                    // Emit the 'openedChanged' event
                    this.openedChanged.emit(this.opened);

                    // If the sidebar was folded, forcefully fold it again
                    if (this.wasCollapsed) {
                        // Enable the animations
                        this.enableAnimations();

                        // collapse
                        this.collapsed = true;

                        // Mark for check
                        this.changeDetectorRef.markForCheck();
                    }

                    // Hide the backdrop if any exists
                    this.hideBackdrop();
                }
                // De-Activate the lockedOpen
                else {
                    // Set the lockedOpen status
                    this.isLockedOpen = false;

                    // expand the sidebar in case if it was folded
                    this.expand();

                    // Force the the opened status to close
                    this.opened = false;

                    // Emit the 'openedChanged' event
                    this.openedChanged.emit(this.opened);

                    // Hide the sidebar
                    this.hideSidebar();
                }

                // Store the new active status
                this.wasActive = isActive;
            });
    }

    /**
     * Setup the initial folded status
     *
     * @private
     */
    private setupCollapsed(): void {
        // Return, if sidebar is not folded
        if (!this.collapsed) {
            return;
        }

        // Return if the sidebar is closed
        if (!this.opened) {
            return;
        }

        // Programmatically add/remove padding to the element
        // that comes after or before based on the position
        let sibling,
            styleRule;

        const styleValue = this.collapseWidth + 'px';

        // Get the sibling and set the style rule
        if (this.position === 'left') {
            sibling = this.elementRef.nativeElement.nextElementSibling;
            styleRule = 'padding-left';
        }
        else {
            sibling = this.elementRef.nativeElement.previousElementSibling;
            styleRule = 'padding-right';
        }

        // If there is no sibling, return...
        if (!sibling) {
            return;
        }

        // collapse the sidebar
        this.collapse();

        // Set the folded width
        this.renderer.setStyle(this.elementRef.nativeElement, 'width', styleValue);
        this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', styleValue);
        this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', styleValue);

        // Set the style and class
        this.renderer.setStyle(sibling, styleRule, styleValue, RendererStyleFlags2.Important + RendererStyleFlags2.DashCase);
        this.renderer.addClass(this.elementRef.nativeElement, 'collapsed');
    }

    /**
     * Show the backdrop
     *
     * @private
     */
    private showBackdrop(): void {
        // Create the backdrop element
        this.backdrop = this.renderer.createElement('div');

        // Add a class to the backdrop element
        this.backdrop.classList.add('notadd-sidebar-overlay');

        // Add a class depending on the invisibleOverlay option
        if (this.invisibleOverlay) {
            this.backdrop.classList.add('notadd-sidebar-overlay-invisible');
        }

        // Append the backdrop to the parent of the sidebar
        this.renderer.appendChild(this.elementRef.nativeElement.parentElement, this.backdrop);

        // Create the enter animation and attach it to the player
        this.player =
            this.animationBuilder
                .build([
                    animate('300ms ease', style({opacity: 1}))
                ]).create(this.backdrop);

        // Play the animation
        this.player.play();

        // Add an event listener to the overlay
        this.backdrop.addEventListener('click', () => {
                this.close();
            }
        );

        // Mark for check
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Hide the backdrop
     *
     * @private
     */
    private hideBackdrop(): void {
        if (!this.backdrop) {
            return;
        }

        // Create the leave animation and attach it to the player
        this.player =
            this.animationBuilder
                .build([
                    animate('300ms ease', style({opacity: 0}))
                ]).create(this.backdrop);

        // Play the animation
        this.player.play();

        // Once the animation is done...
        this.player.onDone(() => {

            // If the backdrop still exists...
            if (this.backdrop) {
                // Remove the backdrop
                this.backdrop.parentNode.removeChild(this.backdrop);
                this.backdrop = void (0);
            }
        });

        // Mark for check
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Change some properties of the sidebar
     * and make it visible
     *
     * @private
     */
    private showSidebar(): void {
        // Remove the box-shadow style
        this.renderer.removeStyle(this.elementRef.nativeElement, 'box-shadow');

        // Make the sidebar invisible
        this.renderer.removeStyle(this.elementRef.nativeElement, 'visibility');

        // Mark for check
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Change some properties of the sidebar
     * and make it invisible
     *
     * @private
     */
    private hideSidebar(delay = true): void {
        const delayAmount = delay ? 300 : 0;

        // Add a delay so close animation can play
        setTimeout(() => {

            // Remove the box-shadow
            this.renderer.setStyle(this.elementRef.nativeElement, 'box-shadow', 'none');

            // Make the sidebar invisible
            this.renderer.setStyle(this.elementRef.nativeElement, 'visibility', 'hidden');
        }, delayAmount);

        // Mark for check
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Enable the animations
     *
     * @private
     */
    private enableAnimations(): void {
        // Return if animations already enabled
        if (this.animationsEnabled) {
            return;
        }

        // Enable the animations
        this.animationsEnabled = true;

        // Mark for check
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Open the sidebar
     */
    open(): void {
        if (this.opened || this.isLockedOpen) {
            return;
        }

        // Enable the animations
        this.enableAnimations();

        // Show the sidebar
        this.showSidebar();

        // Show the backdrop
        this.showBackdrop();

        // Set the opened status
        this.opened = true;

        // Emit the 'openedChanged' event
        this.openedChanged.emit(this.opened);

        // Mark for check
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Close the sidebar
     */
    close(): void {
        if (!this.opened || this.isLockedOpen) {
            return;
        }

        // Enable the animations
        this.enableAnimations();

        // Hide the backdrop
        this.hideBackdrop();

        // Set the opened status
        this.opened = false;

        // Emit the 'openedChanged' event
        this.openedChanged.emit(this.opened);

        // Hide the sidebar
        this.hideSidebar();

        // Mark for check
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Toggle open/close the sidebar
     */
    toggleOpen(): void {
        if (this.opened) {
            this.close();
        }
        else {
            this.open();
        }
    }

    /**
     * Mouseenter
     */
    @HostListener('mouseenter')
    onMouseEnter(): void {
        // Only work if the auto trigger is enabled
        if (!this.collapseAutoTriggerOnHover) {
            return;
        }

        this.expandTemporarily();
    }

    /**
     * Mouseleave
     */
    @HostListener('mouseleave')
    onMouseLeave(): void {
        // Only work if the auto trigger is enabled
        if (!this.collapseAutoTriggerOnHover) {
            return;
        }

        this.collapseTemporarily();
    }

    /**
     * collapse the sidebar permanently
     */
    collapse(): void {
        // Only work if the sidebar is not folded
        if (this.collapsed) {
            return;
        }

        // Enable the animations
        this.enableAnimations();

        // collapse
        this.collapsed = true;

        // Mark for check
        this.changeDetectorRef.markForCheck();
    }

    /**
     * expand the sidebar permanently
     */
    expand(): void {
        // Only work if the sidebar is folded
        if (!this.collapsed) {
            return;
        }

        // Enable the animations
        this.enableAnimations();

        // expand
        this.collapsed = false;

        // Mark for check
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Toggle the sidebar fold/unfold permanently
     */
    toggleFold(): void {
        if (this.collapsed) {
            this.expand();
        }
        else {
            this.collapse();
        }
    }

    /**
     * Fold the temporarily expanded sidebar back
     */
    collapseTemporarily(): void {
        // Only work if the sidebar is folded
        if (!this.collapsed) {
            return;
        }

        // Enable the animations
        this.enableAnimations();

        // Collapse the sidebar back
        this.expanded = false;

        // Set the collapsed width
        const styleValue = this.collapseWidth + 'px';

        this.renderer.setStyle(this.elementRef.nativeElement, 'width', styleValue);
        this.renderer.setStyle(this.elementRef.nativeElement, 'min-width', styleValue);
        this.renderer.setStyle(this.elementRef.nativeElement, 'max-width', styleValue);

        // Mark for check
        this.changeDetectorRef.markForCheck();
    }

    /**
     * Unfold the sidebar temporarily
     */
    expandTemporarily(): void {
        // Only work if the sidebar is folded
        if (!this.collapsed) {
            return;
        }

        // Enable the animations
        this.enableAnimations();

        // Expand the sidebar temporarily
        this.expanded = true;

        // Remove the folded width
        this.renderer.removeStyle(this.elementRef.nativeElement, 'width');
        this.renderer.removeStyle(this.elementRef.nativeElement, 'min-width');
        this.renderer.removeStyle(this.elementRef.nativeElement, 'max-width');

        // Mark for check
        this.changeDetectorRef.markForCheck();
    }
}
