import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, MatDividerModule } from '@angular/material';

import { NotaddSharedModule } from '@notadd/shared.module';
import { NotaddSearchBarModule } from '@notadd/components';

import { ToolbarComponent } from './toolbar.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,

        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MatDividerModule,

        NotaddSharedModule,
        NotaddSearchBarModule
    ],
    declarations: [ ToolbarComponent ],
    exports: [ ToolbarComponent ]
})
export class ToolbarModule {
}
