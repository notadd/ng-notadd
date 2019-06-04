import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
