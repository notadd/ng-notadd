import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
} from '@angular/material';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NotaddPipesModule } from '@notadd/pipes/pipes.module';
import { NotaddDirectivesModule } from '@notadd/directives/directives.module';
import { NotaddToolbarNavComponent } from './toolbar-nav/toolbar-nav.component';

@NgModule({
    declarations: [ NotaddToolbarNavComponent ],
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatListModule,
        OverlayModule,
        PortalModule,
        FlexLayoutModule,

        NotaddPipesModule,
        NotaddDirectivesModule,
    ],
    exports: [ NotaddToolbarNavComponent ]
})
export class NotaddToolbarNavModule {
}
