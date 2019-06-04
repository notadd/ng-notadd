import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
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
