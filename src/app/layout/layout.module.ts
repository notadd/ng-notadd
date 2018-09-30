import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotaddSharedModule } from '@notadd/shared.module';
import { NotaddSidebarModule } from '@notadd/components/sidebar/sidebar.module';

import { ToolbarModule } from './components/toolbar/toolbar.module';
import { FooterModule } from './components/footer/footer.module';

import { LayoutComponent } from './layout.component';

@NgModule({
    imports: [
        CommonModule,

        NotaddSharedModule,
        NotaddSidebarModule,

        ToolbarModule,
        FooterModule
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
