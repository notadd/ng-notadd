import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
} from '@angular/material';

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

        NotaddFileUploadModule,
        AdvancedUiRoutingModule
    ],
    declarations: [
        FileUploadComponent
    ]
})
export class AdvancedUiModule {
}
