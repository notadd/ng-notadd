import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routingPathConfig } from '@config/routing-path.config';
import { ExcelExportComponent } from './excel-export/excel-export.component';

const routes: Routes = [
    {
        path: routingPathConfig.services.default,
        redirectTo: routingPathConfig.services.excelExport,
        pathMatch: 'full',
    },
    {
        path: routingPathConfig.services.excelExport,
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
