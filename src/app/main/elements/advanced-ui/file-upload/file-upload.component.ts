import { Component, OnInit } from '@angular/core';
import { NotaddFileUploadService } from '@notadd/services/notadd-file-upload.service';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

    fileList: Array<File> = [];
    constructor(
        private fileUploadService: NotaddFileUploadService
    ) {
    }

    ngOnInit() {
    }

    onFileUpload() {
        this.fileUploadService.upload()
            .pipe(filter(files => !!files.length))
            .subscribe(files => {
                files.map(file => {
                    this.fileList.push(file);
                });
            });
    }
}
