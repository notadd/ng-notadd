import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatIconModule, MatMenuModule, MatRippleModule } from '@angular/material';

import { NotaddPipesModule } from '@notadd/pipes/pipes.module';

import { NotaddMaterialColorPickerComponent } from './material-color-picker.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatRippleModule,

        NotaddPipesModule
    ],
    declarations: [ NotaddMaterialColorPickerComponent ],
    exports: [ NotaddMaterialColorPickerComponent ]
})
export class NotaddMaterialColorPickerModule {
}
