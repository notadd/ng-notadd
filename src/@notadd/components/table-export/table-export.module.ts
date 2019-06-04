import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
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
