import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { NotaddSharedModule } from '@notadd/shared.module';
import { NotaddTableExportModule, NotaddScreenshotModule } from '@notadd/components';

import { ExcelExportComponent } from './excel-export/excel-export.component';
import { ScreenshotComponent } from './screenshot/screenshot.component';
import { ServicesRoutingModule } from './services-routing.module';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule,

        NotaddSharedModule,
        NotaddTableExportModule,
        NotaddScreenshotModule,

        ServicesRoutingModule
    ],
    declarations: [
        ExcelExportComponent,
        ScreenshotComponent,
    ]
})
export class ServicesModule {
}
