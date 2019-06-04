import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule as CDKLayoutModule } from '@angular/cdk/layout';

import { NotaddSharedModule } from '@notadd/shared.module';
import { NotaddSidebarModule } from '@notadd/components/sidebar/sidebar.module';

import { ToolbarModule } from './components/toolbar/toolbar.module';
import { FooterModule } from './components/footer/footer.module';
import { NavbarModule } from './components/navbar/navbar.module';
import { ContentModule } from './components/content/content.module';

import { LayoutComponent } from './layout.component';

@NgModule({
    imports: [
        CommonModule,
        MatSidenavModule,
        CDKLayoutModule,

        NotaddSharedModule,
        NotaddSidebarModule,

        ToolbarModule,
        FooterModule,
        NavbarModule,
        ContentModule
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
