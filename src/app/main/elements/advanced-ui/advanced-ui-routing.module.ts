import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FileUploadComponent } from './file-upload/file-upload.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'file-upload',
        pathMatch: 'full',
    },
    {
        path: 'file-upload',
        component: FileUploadComponent,
        data: {
            title: '文件上传'
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
