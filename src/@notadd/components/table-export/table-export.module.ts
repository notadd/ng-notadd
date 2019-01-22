import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatDialogModule,
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule,
    MatRadioModule,
    MatInputModule,
    MatButtonModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgxXLSXModule } from '@notadd/ngx-xlsx';

import { NotaddExcelExportService } from '@notadd/services/notadd-excel-export.service';

import { NotaddTableExportPickerComponent } from './table-export-picker.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatCheckboxModule,
        MatIconModule,
        MatDividerModule,
        MatRadioModule,
        MatInputModule,
        MatButtonModule,
        FlexLayoutModule,
        NgxXLSXModule
    ],
    declarations: [
        NotaddTableExportPickerComponent
    ],
    entryComponents: [
        NotaddTableExportPickerComponent
    ],
    exports: [
        NotaddTableExportPickerComponent,
    ],
    providers: [
        NotaddExcelExportService
    ]
})
export class NotaddTableExportModule {
}
