import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';

import { NotaddDirectivesModule } from '@notadd/directives/directives.module';
import { NotaddSidebarModule } from '@notadd/components/sidebar/sidebar.module';
import { NotaddMaterialColorPickerModule } from '@notadd/components/material-color-picker/material-color-picker.module';

import { NotaddThemePanelComponent } from './theme-panel.component';

@NgModule({
    imports: [
        CommonModule,

        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,

        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatOptionModule,
        MatRadioModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTabsModule,

        TranslateModule.forChild(),

        NotaddDirectivesModule,
        NotaddSidebarModule,
        NotaddMaterialColorPickerModule
    ],
    declarations: [ NotaddThemePanelComponent ],
    exports: [ NotaddThemePanelComponent ]
})
export class NotaddThemePanelModule {
}
