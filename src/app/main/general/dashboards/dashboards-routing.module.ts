import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnalysisComponent } from './analysis/analysis.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'analytics',
        pathMatch: 'full',
    },
    {
        path: 'analytics',
        component: AnalysisComponent,
        data: {
            title: '分析页',
            hasContentHeader: false
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
export class DashboardsRoutingModule {
}
