import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExcelExportComponent } from './excel-export/excel-export.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'excel-export',
        pathMatch: 'full',
    },
    {
        path: 'excel-export',
        component: ExcelExportComponent,
        data: {
            title: '导出 Excel',
            hasContentHeader: true
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
export class ServicesRoutingModule {
}
