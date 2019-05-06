import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NotaddSpeedDialFabComponent } from './speed-dial-fab.component';

@NgModule({
    declarations: [NotaddSpeedDialFabComponent],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        OverlayModule,
        PortalModule,
        FlexLayoutModule
    ],
    exports: [NotaddSpeedDialFabComponent]
})
export class NotaddSpeedDialFabModule {
}
