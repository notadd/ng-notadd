import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'path'
})
export class RoutingPathPipe implements PipeTransform {

    transform(paths: Array<string>, paramObj: {[propNam: string]: string | number} = {}): string {

        if (!Array.isArray(paths)) {
            return;
        }

        let routingPath = '';
        const paramKeys = Object.keys(paramObj);

        paths.map(path => {
            path.includes(':') && paramKeys.map(key => {
                if (path.includes(key)) {
                    path = path.replace(`:${key}`, paramObj[key].toString());
                }
            });
            routingPath += `/${path}`;
        });

        return routingPath;
    }

}
