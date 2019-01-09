import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';

import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import BMF from 'browser-md5-file';

export interface FileUpload {
    fileUrls: Array<string>;
}

export interface FileProgressUpload {
    [propName: string]: Observable<number>;
}

export interface FileUploadError {
    type: string;
    errors: Array<string>;
}

export interface ProgressFile {
    file: File;
    extra: any;
}

@Injectable()
export class NotaddFileUploadService {

    uploadFile = gql`
        mutation uploadFile($md5: String!, $contentName: String!) {
            uploadProcess(bucketName: "upyuns", md5: $md5, contentName: $contentName){
                code,
                message,
                url,
                method,
                form{
                    authorization,
                    policy
                }
            }
        }
    `;
    fileDomain = 'https://upyuns.b0.upaiyun.com';
    fileUrls: Array<string> = [];

    private uploadError: {
        normal: Array<string>;
        progress: Array<string>;
    };
    private uploadType: string;
    private progressFiles: Array<ProgressFile>;
    private bmf: BMF;
    private _fileUploadChange: Subject<FileUpload> = new Subject<FileUpload>();
    private _fileUploadProgressChange: Subject<FileProgressUpload> = new Subject<FileProgressUpload>();
    private _fileUploadErrorChange: Subject<FileUploadError> = new Subject<FileUploadError>();

    constructor(
        private http: HttpClient,
        private apollo: Apollo,
    ) {
        this.bmf = new BMF();
        this.uploadError = {
            normal: [],
            progress: []
        };
    }

    get fileUploadChange() {
        return this._fileUploadChange.asObservable();
    }

    setFileUploadChange() {
        this._fileUploadChange.next({
            fileUrls: this.fileUrls
        });
    }

    get fileUploadProgressChange() {
        return this._fileUploadProgressChange.asObservable();
    }

    setFileUploadProgressChange(value: FileProgressUpload) {
        this._fileUploadProgressChange.next(value);
    }

    get fileUploadErrorChange() {
        return this._fileUploadErrorChange.asObservable();
    }

    setFileUploadErrorChange() {
        this._fileUploadErrorChange.next({
            type: this.uploadType,
            errors: this.uploadError[this.uploadType]
        });
    }

    startUpload(files, type = 'normal') {
        this.uploadType = type;
        this.fileUrls = [];
        this.uploadError[this.uploadType] = [];
        this.progressFiles = [];
        this.upload(files);
    }

    private upload(files, index = 0) {
        const file = files[index];
        this.bmf.md5(file, (err, md5) => {
            this.apollo.use('upload')
                .mutate({
                   mutation: this.uploadFile,
                   variables: {
                       md5,
                       contentName: file.name
                   }
                })
                .pipe(
                    map(res => res.data.uploadProcess)
                )
                .subscribe(data => {
                    if (data.code === 200) {
                        if (this.uploadType === 'normal') {
                            this.upyunUpload(index, files, data);
                        } else {
                            this.progressFiles.push({
                                file,
                                extra: data
                            });
                            index++;
                            index === files.length ? this.uploadWithProgress() : this.upload(files, index);
                        }
                    } else {
                        this.uploadError[this.uploadType].push(data.message);
                        this.setFileUploadErrorChange();
                    }
                }, (error) => {
                    this.uploadError[this.uploadType].push(error);
                    this.setFileUploadErrorChange();
                });
        });
    }

    uploadWithProgress() {
        // this will be the our resulting map
        const status = {};
        this.progressFiles.forEach(({ file, extra}) => {
            // create a new multipart-form for every file
            const formData: FormData = new FormData();
            formData.append('file', file, file.name);
            formData.append('policy', extra.form.policy);
            formData.append('authorization', extra.form.authorization);

            // create a http-post request and pass the form
            // tell it to report the upload progress
            const req = new HttpRequest('POST', extra.url, formData, {
                reportProgress: true
            });

            // create a new progress-subject for every file
            const progress = new Subject<number | any>();

            // send the http-request and subscribe for progress-updates
            this.http.request(req).subscribe(event => {
                if (event.type === HttpEventType.UploadProgress) {
                    // calculate the progress percentage
                    const percentDone = Math.round((100 * event.loaded) / event.total);
                    // pass the percentage into the progress-stream
                    progress.next(percentDone);
                } else if (event instanceof HttpResponse) {
                    // Close the progress-stream if we get an answer form the API
                    // The upload is complete
                    progress.next(event.body);
                    progress.complete();
                }
            }, error => {
                this.uploadError[this.uploadType].push(`${error.name} : [ ${error.error.message || error.message} ]`);
                this.setFileUploadErrorChange();
                progress.error(error);
                progress.complete();
            });

            // Save every progress-observable in a map of all observables
            status[file.name] = {
                progress: progress.asObservable()
            };
        });

        this.setFileUploadProgressChange(status);
        // return the map of progress.observables
        // return status;
    }

    private upyunUpload(index, files, {url, form: {policy, authorization}}) {
        const file = files[index];

        const formData = new FormData();
        formData.append('file', file, file.name);
        formData.append('policy', policy);
        formData.append('authorization', authorization);

        this.http.post(url, formData)
            .subscribe((res: any) => {
                if (res.code === 200) {
                    this.fileUrls.push(this.fileDomain + res.url);
                    index ++;
                    index === files.length ? this.setFileUploadChange() : this.upload(files, index);
                } else {
                    this.uploadError[this.uploadType].push(res.message);
                    this.setFileUploadErrorChange();
                }
            }, (error) => {
                this.uploadError[this.uploadType].push(`${error.name} : [ ${error.error.message || error.message} ]`);
                this.setFileUploadErrorChange();
            });
    }
}
