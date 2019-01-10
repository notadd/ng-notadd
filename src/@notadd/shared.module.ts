import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { NotaddDirectivesModule } from '@notadd/directives/directives.module';
import { NotaddPipesModule } from '@notadd/pipes/pipes.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        NotaddDirectivesModule,
        NotaddPipesModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        NotaddDirectivesModule,
        NotaddPipesModule
    ]
})
export class NotaddSharedModule {
}
