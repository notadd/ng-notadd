import { NgModule } from '@angular/core';
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

import { DashboardsRoutingModule } from './dashboards-routing.module';

import { AnalysisComponent } from './analysis/analysis.component';
import { AnalysisService } from './analysis/analysis.service';

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

        DashboardsRoutingModule
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
