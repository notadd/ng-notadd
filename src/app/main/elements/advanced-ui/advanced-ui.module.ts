import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCardModule,
    MatCheckboxModule,
    MatMenuModule,
    MatToolbarModule
} from '@angular/material';

import { MaterialDesignFrameworkModule } from 'angular6-json-schema-form';

import { NotaddSharedModule } from '@notadd/shared.module';
import { NotaddFileUploadModule } from '@notadd/components';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { JsonSchemaFormComponent } from './json-schema-form/json-schema-form.component';
import { AceEditorDirective } from './json-schema-form/ace-editor.directive';
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
        MatCardModule,
        MatCheckboxModule,
        MatMenuModule,
        MatToolbarModule,

        MaterialDesignFrameworkModule,

        NotaddSharedModule,
        NotaddFileUploadModule,
        AdvancedUiRoutingModule
    ],
    declarations: [
        FileUploadComponent,
        JsonSchemaFormComponent,
        AceEditorDirective
    ]
})
export class AdvancedUiModule {
}
