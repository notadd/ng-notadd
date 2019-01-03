import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'featurePermissionIndeterminate'
})
export class FeaturePermissionIndeterminatePipe implements PipeTransform {

    transform(value: Array<any>, args?: any): any {
        let count = 0;
        value.map(item => {
            item.value && count++;
        });
        return count > 0 && count < value.length;
    }

}

@Pipe({
    name: 'featurePermissionCheckedAll'
})
export class FeaturePermissionCheckedAllPipe implements PipeTransform{
    transform(value: Array<any>, args?: any): any {
        let count = 0;
        value.map(item => {
            item.value && count++;
        });
        return count > 0 && count === value.length;
    }
}
