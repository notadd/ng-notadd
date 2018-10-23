import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NotaddBreadcrumbComponent } from './breadcrumb.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [ NotaddBreadcrumbComponent ],
    exports: [ NotaddBreadcrumbComponent ]
})
export class NotaddBreadcrumbModule {
}
