import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material';

import { NotaddSharedModule } from '@notadd/shared.module';
import { NotaddSidebarModule } from '@notadd/components/sidebar/sidebar.module';

import { ToolbarModule } from './components/toolbar/toolbar.module';
import { FooterModule } from './components/footer/footer.module';
import { NavbarModule } from './components/navbar/navbar.module';

import { LayoutComponent } from './layout.component';

@NgModule({
    imports: [
        CommonModule,
        MatSidenavModule,

        NotaddSharedModule,
        NotaddSidebarModule,

        ToolbarModule,
        FooterModule,
        NavbarModule
    ],
    declarations: [
        LayoutComponent
    ],
    exports: [
        LayoutComponent
    ]
})
export class LayoutModule {
}
