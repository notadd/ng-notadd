import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataTableService {

    constructor(private http: HttpClient) {
    }

    getStatisticalData(): Observable<Array<any>> {
        return this.http.get<Array<any>>('assets/data/staticTable.json');
    }

}
