import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboards',
        pathMatch: 'full',
    },
    {
        path: 'dashboards',
        loadChildren: './dashboards/dashboards.module#DashboardsModule',
        data: {
            title: '仪表盘'
        }
    },
    {
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule',
        data: {
            title: '页面'
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
export class GeneralRoutingModule {
}
