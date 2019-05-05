import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routingPathConfig } from '@config/routing-path.config';
import { AnalysisComponent } from './analysis/analysis.component';
import { WorkspaceComponent } from './workspace/workspace.component';

const routes: Routes = [
    {
        path: routingPathConfig.dashboards.default,
        redirectTo: routingPathConfig.dashboards.analytics,
        pathMatch: 'full',
    },
    {
        path: routingPathConfig.dashboards.analytics,
        component: AnalysisComponent,
        data: {
            title: '分析页',
            hasContentHeader: false
        }
    },
    {
        path: routingPathConfig.dashboards.workspace,
        component: WorkspaceComponent,
        data: {
            title: '工作台',
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
