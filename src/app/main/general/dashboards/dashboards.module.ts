import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatTabsModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    MatDividerModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatInputModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxEchartsModule } from 'ngx-echarts';
import { GridsterModule } from 'angular-gridster2';
import { NotaddSharedModule } from '@notadd/shared.module';
import { NotaddPipesModule } from '@notadd/pipes/pipes.module';
import { NotaddWidgetModule, NotaddSpeedDialFabModule } from '@notadd/components';

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
        MatDialogModule,
        MatDividerModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,

        NgxEchartsModule,
        GridsterModule,
        NotaddSharedModule,
        NotaddPipesModule,
        NotaddWidgetModule,
        NotaddSpeedDialFabModule,

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
