import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    MatCardModule
} from '@angular/material';

import { NgxEchartsModule } from 'ngx-echarts';
import { NgxAmapModule } from 'ngx-amap';
import { NotaddSharedModule } from '@notadd/shared.module';
import { NotaddPipesModule } from '@notadd/pipes/pipes.module';

import { AnalysisService } from './analysis/analysis.service';
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
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatTabsModule,
        MatCardModule,

        NgxEchartsModule,
        NgxAmapModule.forRoot({
            apiKey: ''
        }),
        NotaddSharedModule,
        NotaddPipesModule,

        RouterModule.forChild(routes)
    ],
    declarations: [
        AnalysisComponent
    ],
    providers: [
        AnalysisService
    ]
})
export class DashboardsModule {
}
