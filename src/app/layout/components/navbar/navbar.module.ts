import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatDividerModule } from '@angular/material';
import { PortalModule } from '@angular/cdk/portal';

import { NotaddSharedModule } from '@notadd/shared.module';
import { NotaddNavigationModule } from '@notadd/components';

import { NavbarComponent } from './navbar.component';

@NgModule({
    imports: [
        CommonModule,

        MatButtonModule,
        MatIconModule,
        MatDividerModule,

        PortalModule,

        NotaddSharedModule,
        NotaddNavigationModule
    ],
    declarations: [ NavbarComponent ],
    exports: [ NavbarComponent ]
})
export class NavbarModule {
}
