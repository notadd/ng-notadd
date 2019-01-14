import { Component, OnInit } from '@angular/core';

import { NotaddExcelExportService } from '@notadd/services/notadd-excel-export.service';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: Array<PeriodicElement> = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
    selector: 'excel-export',
    templateUrl: './excel-export.component.html',
    styleUrls: ['./excel-export.component.scss']
})
export class ExcelExportComponent implements OnInit {

    dataSource: Array<any>;
    tableHeaders: {[propName: string]: string};

    constructor(
        private excelExportService: NotaddExcelExportService
    ) {
        this.dataSource = ELEMENT_DATA;
        this.tableHeaders = {
            position: 'No.',
            name: 'Name',
            weight: 'Weight',
            symbol: 'Symbol'
        };
    }

    get displayedColumns(): Array<string> { return Object.keys(this.tableHeaders); }

    ngOnInit() {
    }

    exportNormal() {
        this.excelExportService.exportNormal(this.dataSource, 'Export-with-normal', this.tableHeaders);
    }

    exportSpecified() {
        this.excelExportService.exportSpecified(this.dataSource, 'Export by specified rows and columns', this.tableHeaders);
    }
}
