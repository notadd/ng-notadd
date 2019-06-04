import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NotaddFileUploadService as UploadService } from '@notadd/services/notadd-file-upload.service';
import { NotaddPipesModule } from '@notadd/pipes/pipes.module';
import { NotaddDirectivesModule } from '@notadd/directives/directives.module';
import { NotaddFileUploadService } from './file-upload.service';
import { NotaddFileUploadComponent } from './file-upload.component';
import { NotaddFileUploadDialogComponent } from './dialog/dialog.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatDialogModule,
        MatListModule,
        MatProgressBarModule,
        FlexLayoutModule,

        NotaddPipesModule,
        NotaddDirectivesModule
    ],
    declarations: [
        NotaddFileUploadComponent,
        NotaddFileUploadDialogComponent
    ],
    exports: [
        NotaddFileUploadComponent,
        NotaddFileUploadDialogComponent
    ],
    providers: [
        NotaddFileUploadService,
        UploadService
    ],
    entryComponents: [
        NotaddFileUploadDialogComponent
    ]
})
export class NotaddFileUploadModule {
}
