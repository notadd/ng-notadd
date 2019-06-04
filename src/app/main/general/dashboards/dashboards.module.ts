import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
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
