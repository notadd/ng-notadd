import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkOverlayOrigin, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortalDirective } from '@angular/cdk/portal';

import { notaddSpeedDialFabAnimations } from './speed-dial-fab.animations';

@Component({
    selector: 'notadd-speed-dial-fab',
    templateUrl: './speed-dial-fab.component.html',
    styleUrls: ['./speed-dial-fab.component.scss'],
    animations: notaddSpeedDialFabAnimations
})
export class NotaddSpeedDialFabComponent implements OnInit {

    @ViewChild(CdkOverlayOrigin) overlayOrigin: CdkOverlayOrigin;
    @ViewChild('notaddSpeedDialFabActionsTemplate') notaddSpeedDialFabActionsTemplate: TemplatePortalDirective;
    overlayRef: OverlayRef;
    fabTriggerState: string;

    constructor(
        private overlay: Overlay,
    ) {
        this.fabTriggerState = 'inactive';
    }

    ngOnInit() {
        const config = new OverlayConfig({
            hasBackdrop: false,
            scrollStrategy: this.overlay.scrollStrategies.block()
        });

        config.positionStrategy = this.overlay
            .position()
            .connectedTo(
                this.overlayOrigin.elementRef,
                { originX: 'center', originY: 'top' },
                { overlayX: 'center', overlayY: 'bottom' }
            )
            .withOffsetY(-20);

        this.overlayRef = this.overlay.create(config);

    }

    toggleActions(): void {
        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.overlayRef.detach();
            this.fabTriggerState = 'inactive';
        } else {
            this.overlayRef.attach(this.notaddSpeedDialFabActionsTemplate);
            this.fabTriggerState = 'active';
        }
    }

}
