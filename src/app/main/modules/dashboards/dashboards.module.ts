import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatSelectModule, MatTabsModule } from '@angular/material';

import { AnalysisComponent } from './analysis/analysis.component';

import { NotaddSharedModule } from '@notadd/shared.module';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'analytics',
        pathMatch: 'full',
    },
    {
        path: 'analytics',
        component: AnalysisComponent,
        data: {title: '分析页'}
    }
];

@NgModule({
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatTabsModule,

        NotaddSharedModule,

        RouterModule.forChild(routes)
    ],
    declarations: [
        AnalysisComponent
    ]
})
export class DashboardsModule {
}
