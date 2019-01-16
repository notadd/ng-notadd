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
import { JsonSchemaFormComponent } from './json-schema-form/json-schema-form.component';

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
        FileUploadComponent,
        JsonSchemaFormComponent
    ]
})
export class AdvancedUiModule {
}
