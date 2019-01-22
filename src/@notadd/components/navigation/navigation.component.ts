import { Component, Input, OnInit, OnDestroy, ViewEncapsulation, Inject, Renderer2, ComponentFactoryResolver, ApplicationRef, ViewContainerRef, Injector } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { CdkPortal, DomPortalOutlet } from '@angular/cdk/portal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NotaddNavigationService } from '@notadd/components/navigation/navigation.service';

@Component({
    selector: 'notadd-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NotaddNavigationComponent implements OnInit, OnDestroy {
    @Input()
    navigation: any;

    domPortalOutlet: DomPortalOutlet;

    private bodyElement: HTMLBodyElement;

    private menuElement: HTMLDivElement;

    private ngUnsubscribe: Subject<any>;

    constructor(
        private navigationService: NotaddNavigationService,
        private render2: Renderer2,
        @Inject(DOCUMENT) private document: any,
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private viewContainerRef: ViewContainerRef,
        private injector: Injector
    ) {
        this.ngUnsubscribe = new Subject<any>();
        this.bodyElement = this.document.querySelector('body');
    }

    ngOnInit() {
        this.navigation = this.navigation || this.navigationService.getCurrentNavigation();

        // 订阅当前导航的改变
        this.navigationService.onNavigationChanged
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
                this.navigation = this.navigationService.getCurrentNavigation();
            });
    }

    createOverlayMenu() {
        this.menuElement = this.render2.createElement('div');
        this.menuElement.classList.add('overlay-menu');
        this.menuElement.innerHTML = '<span>Angular Material</span>';
        this.bodyElement.appendChild(this.menuElement);
        this.domPortalOutlet = new DomPortalOutlet(this.menuElement, this.componentFactoryResolver, this.appRef, this.injector);
    }

    addTemplatePortal() {
        // this.domPortalOutlet.attachTemplatePortal();
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
