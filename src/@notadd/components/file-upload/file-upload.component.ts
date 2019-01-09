import { Component, OnInit, OnDestroy, EventEmitter, Input, Output, ViewEncapsulation, HostBinding, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import { NotaddUtils } from '@notadd/utils';
import { NotaddFileUploadService } from './file-upload.service';

@Component({
    selector: 'notadd-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})
export class NotaddFileUploadComponent implements OnInit, OnDestroy {

    @HostBinding('attr.class') class = 'core-upload';

    @Input() accept = 'image/*';
    @Input() maxFileSize = 5; // 5MB
    @Input() maxFiles = 5;
    @Input() fileCount = 5;
    @Input() fileExtensions = 'JPG, GIF, PNG';
    @Input() fileUrls: Array<string> = [];

    @Output() uploadChange = new EventEmitter();

    isUploading = false;
    dragAreaClass = 'dragarea';
    errors: Array<string> = [];

    private ngUnsubscribe: Subject<boolean> = new Subject();

    constructor(
        private fileUploadService: NotaddFileUploadService,
    ) {
    }

    ngOnInit() {
        this.fileUploadService.fileUploadChange
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(({fileUrls}) => {
                fileUrls.map(file => {
                    this.fileUrls.push(file);
                });
                this.uploadChange.emit({urls: this.fileUrls});
                this.isUploading = false;
            });

        this.fileUploadService.fileUploadErrorChange
            .pipe(
                takeUntil(this.ngUnsubscribe),
                filter(({type}) => type === 'normal')
            )
            .subscribe(({errors}) => {
                errors.map(err => {
                    this.errors.push(err);
                });
                this.isUploading = false;
            });
    }

    removeFile(index: number) {
        this.fileUrls.splice(index, 1);
        this.uploadChange.emit({urls: this.fileUrls});
    }

    onFileChange(event) {
        const files = event.target.files;
        this.uploadFiles(files);
    }

    @HostListener('dragover', ['$event']) onDragOver(event) {
        this.dragAreaClass = 'droparea';
        event.preventDefault();
    }

    @HostListener('dragenter', ['$event']) onDragEnter(event) {
        this.dragAreaClass = 'droparea';
        event.preventDefault();
    }

    @HostListener('dragend', ['$event']) onDragEnd(event) {
        this.dragAreaClass = 'dragarea';
        event.preventDefault();
    }

    @HostListener('dragleave', ['$event']) onDragLeave(event) {
        this.dragAreaClass = 'dragarea';
        event.preventDefault();
    }

    @HostListener('drop', ['$event']) onDrop(event) {
        this.dragAreaClass = 'dragarea';
        event.preventDefault();
        event.stopPropagation();

        const files = event.dataTransfer.files;
        this.uploadFiles(files);
    }

    uploadFiles(files) {
        // reset error
        this.errors = [
            ...NotaddUtils.isValidFiles(files, this.maxFiles),
            ...NotaddUtils.isValidFileExtension(files, this.fileExtensions),
            ...NotaddUtils.isValidFileSize(files, this.maxFileSize)
        ];
        // Validate file size and allowed extensions
        if (files.length && this.errors.length) {
            return;
        }

        if (files.length > 0) {
            this.isUploading = true;
            this.fileUploadService.startUpload(files);
        }
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
