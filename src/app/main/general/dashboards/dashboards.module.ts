import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    MatCardModule,
    MatListModule
} from '@angular/material';

import { NgxEchartsModule } from 'ngx-echarts';
import { GridsterModule } from 'angular-gridster2';
import { NotaddSharedModule } from '@notadd/shared.module';
import { NotaddPipesModule } from '@notadd/pipes/pipes.module';
import { NotaddWidgetModule } from '@notadd/components';

import { DashboardsRoutingModule } from './dashboards-routing.module';

import { AnalysisComponent } from './analysis/analysis.component';
import { AnalysisService } from './analysis/analysis.service';
import { WidgetsModule } from './workspace/widgets/widgets.module';
import { WorkspaceComponent } from './workspace/workspace.component';

@NgModule({
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatMenuModule,
        MatSelectModule,
        MatTabsModule,
        MatCardModule,
        MatListModule,

        NgxEchartsModule,
        GridsterModule,
        NotaddSharedModule,
        NotaddPipesModule,
        NotaddWidgetModule,

        WidgetsModule,

        DashboardsRoutingModule
    ],
    declarations: [
        AnalysisComponent,
        WorkspaceComponent
    ],
    providers: [
        AnalysisService
    ]
})
export class DashboardsModule {
}
