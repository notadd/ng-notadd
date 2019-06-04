import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
