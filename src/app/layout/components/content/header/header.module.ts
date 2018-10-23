import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NotaddBreadcrumbModule } from '@notadd/components';

import { HeaderComponent } from './header.component';

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        NotaddBreadcrumbModule
    ],
    declarations: [ HeaderComponent ],
    exports: [ HeaderComponent ]
})
export class HeaderModule {
}
