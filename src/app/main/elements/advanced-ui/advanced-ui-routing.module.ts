import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routingPathConfig } from '@config/routing-path.config';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { JsonSchemaFormComponent } from './json-schema-form/json-schema-form.component';

const routes: Routes = [
    {
        path: routingPathConfig.advancedUi.default,
        redirectTo: routingPathConfig.advancedUi.fileUpload,
        pathMatch: 'full',
    },
    {
        path: routingPathConfig.advancedUi.fileUpload,
        component: FileUploadComponent,
        data: {
            title: '文件上传'
        }
    },
    {
        path: routingPathConfig.advancedUi.jsonSchemaForm,
        component: JsonSchemaFormComponent,
        data: {
            title: 'json schema form'
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [],
    exports: [
        RouterModule
    ]
})
export class AdvancedUiRoutingModule {
}
