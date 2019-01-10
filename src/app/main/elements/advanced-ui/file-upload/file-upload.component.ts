import { Component, OnInit } from '@angular/core';
import { NotaddFileUploadService } from '@notadd/services/notadd-file-upload.service';
import { filter } from 'rxjs/operators';

export interface ConfigSelect {
    value: string | number | Array<string>;
    label: string;
}
@Component({
    selector: 'file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

    config: {
        accept: string;
        maxFileSize: number;
        maxFiles: number;
        fileCount: number;
        fileExtensions: string;
        fileUrls: Array<string>;
    };

    acceptSelect: Array<ConfigSelect>;
    maxFileSizeSelect: Array<ConfigSelect>;
    maxFilesSelect: Array<ConfigSelect>;
    fileCountSelect: Array<ConfigSelect>;
    fileExtensionsSelect: Array<ConfigSelect>;
    fileUrlsSelect: Array<ConfigSelect>;

    fileList: Array<File> = [];
    constructor(
        private fileUploadService: NotaddFileUploadService
    ) {
        this.config = {
            accept: 'image/*',
            maxFileSize: 5,
            maxFiles: 5,
            fileCount: 5,
            fileExtensions: 'JPG, GIF, PNG',
            fileUrls: []
        };
        this.acceptSelect = [
            {
                value: 'image/*',
                label: 'Default'
            },
            {
                value: 'image/png',
                label: 'Only PNG'
            },
            {
                value: '.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                label: 'MicroSoft Doc'
            },
            {
                value: '*',
                label: 'Any Type'
            }
        ];
        this.maxFileSizeSelect = [
            {
                value: 5,
                label: 'Default'
            },
            {
                value: 10,
                label: '10 MB'
            },
            {
                value: 15,
                label: '15 MB'
            },
            {
                value: 30,
                label: '30 MB'
            },
            {
                value: 60,
                label: '60 MB'
            }
        ];
        this.maxFilesSelect = [
            {
                value: 5,
                label: 'Default'
            },
            {
                value: 10,
                label: '10 files'
            },
            {
                value: 15,
                label: '15 files'
            },
            {
                value: 30,
                label: '30 files'
            },
            {
                value: 60,
                label: '60 files'
            }
        ];
        this.fileCountSelect = [
            {
                value: 5,
                label: 'Default'
            },
            {
                value: 10,
                label: '10 files'
            },
            {
                value: 15,
                label: '15 files'
            },
            {
                value: 30,
                label: '30 files'
            },
            {
                value: 60,
                label: '60 files'
            }
        ];
        this.fileExtensionsSelect = [
            {
                value: 'JPG, GIF, PNG',
                label: 'Default'
            },
            {
                value: 'DOC, DOCX, XLS, XLSX, PPT, PPTX',
                label: 'MicroSoft Office File'
            },
            {
                value: 'HTML, CSS, JAVASCRIPT',
                label: 'html/css/javascript file'
            },
            {
                value: '*',
                label: 'Any Filename Extension'
            }
        ];
        this.fileUrlsSelect = [
            {
                value: [],
                label: 'Default'
            },
            {
                value: ['https://upyuns.b0.upaiyun.com/mulu3/e3dc65bff77e6526816972fd3fd6b439_1547105256358.png'],
                label: 'Image'
            },
            {
                value: ['https://upyuns.b0.upaiyun.com/mulu3/fae12725ab89050496620c73533b873d_1547105391870.pdf'],
                label: 'PDF'
            }
        ];
    }

    ngOnInit() {
    }

    onFileUpload() {
        this.fileUploadService.upload(this.config)
            .pipe(filter(files => !!files.length))
            .subscribe(files => {
                files.map(file => {
                    this.fileList.push(file);
                });
            });
    }
}
