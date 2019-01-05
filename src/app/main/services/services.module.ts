import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatTableModule,
    MatButtonModule,
} from '@angular/material';

import { NotaddSharedModule } from '@notadd/shared.module';
import { NotaddTableExportModule } from '@notadd/components';

import { ServicesRoutingModule } from './services-routing.module';
import { ExcelExportComponent } from './excel-export/excel-export.component';
@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,

        NotaddSharedModule,
        NotaddTableExportModule,

        ServicesRoutingModule
    ],
    declarations: [
        ExcelExportComponent,
    ]
})
export class ServicesModule {
}
