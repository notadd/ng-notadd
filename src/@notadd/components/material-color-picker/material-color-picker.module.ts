import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

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
