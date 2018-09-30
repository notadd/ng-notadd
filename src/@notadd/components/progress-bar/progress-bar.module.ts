import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatIconModule, MatProgressBarModule } from '@angular/material';

import { NotaddProgressBarComponent } from './progress-bar.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,

        MatButtonModule,
        MatIconModule,
        MatProgressBarModule
    ],
    declarations: [
        NotaddProgressBarComponent
    ],
    exports: [
        NotaddProgressBarComponent
    ]
})
export class NotaddProgressBarModule {
}
