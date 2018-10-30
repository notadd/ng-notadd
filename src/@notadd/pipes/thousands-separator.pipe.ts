import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'thousandsSeparator'
})
export class ThousandsSeparatorPipe implements PipeTransform {

    transform(value: any, args?: any): string {
        return value ? value.toLocaleString() : '';
    }

}
