import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NotaddSharedModule } from '@notadd/shared.module';
import { NotaddSearchBarModule, NotaddToolbarNavModule } from '@notadd/components';

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
        NotaddSearchBarModule,
        NotaddToolbarNavModule
    ],
    declarations: [ ToolbarComponent ],
    exports: [ ToolbarComponent ]
})
export class ToolbarModule {
}
