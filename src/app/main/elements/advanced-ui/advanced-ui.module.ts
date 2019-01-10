import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule
} from '@angular/material';

import { NotaddSharedModule } from '@notadd/shared.module';
import { NotaddFileUploadModule } from '@notadd/components';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AdvancedUiRoutingModule } from './advanced-ui-routing.module';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatDividerModule,
        MatListModule,
        MatIconModule,
        MatSelectModule,
        MatFormFieldModule,

        NotaddSharedModule,
        NotaddFileUploadModule,
        AdvancedUiRoutingModule
    ],
    declarations: [
        FileUploadComponent
    ]
})
export class AdvancedUiModule {
}
