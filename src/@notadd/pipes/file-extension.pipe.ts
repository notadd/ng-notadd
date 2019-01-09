import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fileExtension'
})
export class FileExtensionPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return value.slice((value.lastIndexOf('.') - 1 >>> 0) + 2) || '*';
    }

}

@Pipe({
    name: 'isImageFile'
})
export class IsImageFilePipe implements PipeTransform {
    transform(value: any, args?: any): any {
        return ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'svg'].includes(value.toLowerCase());
    }
}
