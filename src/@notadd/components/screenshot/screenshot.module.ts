import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule, MatDividerModule, MatSnackBarModule } from '@angular/material';

import { NotaddScreenshotService } from '@notadd/services/notadd-screenshot.service';
import { NotaddDirectivesModule } from '@notadd/directives/directives.module';
import { NotaddScreenshotComponent } from './screenshot.component';

@NgModule({
    declarations: [NotaddScreenshotComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatDividerModule,
        MatSnackBarModule,
        NotaddDirectivesModule
    ],
    providers: [
        NotaddScreenshotService
    ],
    entryComponents: [
        NotaddScreenshotComponent
    ]
})
export class NotaddScreenshotModule {
}
