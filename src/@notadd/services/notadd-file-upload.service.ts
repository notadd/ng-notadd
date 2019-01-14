import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

import { NotaddFileUploadDialogComponent } from '@notadd/components/file-upload/dialog/dialog.component';

export interface UploadOptions {
    accept?: string;
    maxFileSize?: number;
    maxFiles?: number;
    fileCount?: number;
    fileExtensions?: string;
}

@Injectable()
export class NotaddFileUploadService {

    constructor(
        private dialog: MatDialog
    ) {}

    upload(options: UploadOptions = {}): Observable<any> {
        const dialogRef = this.dialog.open(NotaddFileUploadDialogComponent, {
            width: '40%',
            height: '50%',
            data: options
        });

        return dialogRef.afterClosed();
    }
}
