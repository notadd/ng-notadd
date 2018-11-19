import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotaddSharedModule } from '@notadd/shared.module';

const routs: Routes = [
    {
        path: '',
        redirectTo: 'dashboards',
        pathMatch: 'full',
    },
    {
        path: 'dashboards',
        loadChildren: './dashboards/dashboards.module#DashboardsModule',
        data: { title: '仪表盘' }
    },
    {
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule',
        data: { title: '页面' }
    }
];

@NgModule(
    {
        imports: [
            NotaddSharedModule,
            RouterModule.forChild(routs)
        ]
    }
)
export class GeneralModule {
}
