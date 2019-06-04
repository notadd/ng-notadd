import { Component, ViewChild, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import { NotaddUtils } from '@notadd/utils';
import { NotaddFileUploadService } from '../file-upload.service';

export interface DialogData {
    accept: string;
    maxFileSize: number;
    maxFiles: number;
    fileCount: number;
    fileExtensions: string;
}

@Component({
    selector: 'notadd-file-upload-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class NotaddFileUploadDialogComponent implements OnInit, OnDestroy {

    @ViewChild('file', { static: true }) file;

    files: Set<File>;
    primaryButtonText: string;
    showCancelButton: boolean;
    uploading: boolean;
    uploadSuccessful: boolean;
    progress: any;
    canBeClosed: boolean;
    errors: Array<string>;
    private uploadResponse: Array<any>;
    private ngUnsubscribe: Subject<boolean> = new Subject();

    constructor(
        private dialogRef: MatDialogRef<NotaddFileUploadDialogComponent>,
        private fileUploadService: NotaddFileUploadService,
        @Inject(MAT_DIALOG_DATA) public dialogData: DialogData
    ) {
        this.files = new Set();
        this.canBeClosed = false;
        this.primaryButtonText = '上传';
        this.showCancelButton = true;
        this.uploading = false;
        this.uploadSuccessful = false;
        this.errors = [];
        this.dialogData = Object.assign({}, {
            accept: 'image/*',
            maxFileSize: 5,
            maxFiles: 5,
            fileCount: 5,
            fileExtensions: 'JPG, GIF, PNG'
        }, this.dialogData);
    }

    get primaryDisabled(): boolean {
        if (this.primaryButtonText === '上传') {
            return !this.files.size || !!this.errors.length || this.uploading;
        } else if (this.primaryButtonText === '重新上传') {
            return !this.files.size;
        } else {
            return this.uploading || !this.canBeClosed;
        }
    }

    get filesErrors() {
        const filesWithArray = Array.from(this.files);
        return [
            ...NotaddUtils.isValidFiles(filesWithArray, this.dialogData.maxFiles),
            ...NotaddUtils.isValidFileExtension(filesWithArray, this.dialogData.fileExtensions),
            ...NotaddUtils.isValidFileSize(filesWithArray, this.dialogData.maxFileSize)
        ];
    }

    ngOnInit () {
        this.fileUploadService.fileUploadProgressChange
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(progress => {
                this.progress = progress;
                // convert the progress map into an array
                const allProgressObservables = [];
                for (const key in this.progress) {
                    allProgressObservables.push(this.progress[key].progress);
                }

                // Adjust the state variables

                // The OK-button should have the text "Finish" now
                this.primaryButtonText = '完成';

                // The dialog should not be closed while uploading
                this.canBeClosed = false;
                this.dialogRef.disableClose = true;

                // Hide the cancel-button
                this.showCancelButton = false;
                // When all progress-observables are completed...
                forkJoin(allProgressObservables).subscribe(end => {
                    this.uploadResponse = end;

                    // ... the upload was successful...
                    this.uploadSuccessful = true;
                }, error => {
                    // Hide the cancel-button
                    this.showCancelButton = true;

                    this.primaryButtonText = '重新上传';
                    this.uploadSuccessful = false;
                }, () => {
                    // ... the dialog can be closed again...
                    this.canBeClosed = true;
                    this.dialogRef.disableClose = false;

                    // ... and the component is no longer uploading
                    this.uploading = false;
                });
            });

        this.fileUploadService.fileUploadErrorChange
            .pipe(
                takeUntil(this.ngUnsubscribe),
                filter(({type}) => type === 'progress')
            )
            .subscribe(({errors}) => {
                errors.map(err => {
                    this.errors.push(err);
                });
            });
    }

    onFilesAdded() {
        const files: { [key: string]: File } = this.file.nativeElement.files;
        for (const key in files) {
            if (!isNaN(parseInt(key))) {
                this.files.add(files[key]);
            }
        }

        this.errors = this.filesErrors;
    }

    addFiles() {
        this.file.nativeElement.click();
    }

    removeFile(file: File) {
        this.files.delete(file);
        this.errors = this.filesErrors;
    }

    closeDialog() {
        if (this.files.size && this.primaryButtonText !== '重新上传' && this.errors.length) {
            return;
        }

        // if everything was uploaded already, just close the dialog
        if (this.uploadSuccessful) {
            return this.dialogRef.close(this.uploadResponse);
        }

        // set the component state to "uploading"
        this.uploading = true;

        // start the upload and save the progress map
        this.fileUploadService.startUpload(Array.from(this.files), 'progress');
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
