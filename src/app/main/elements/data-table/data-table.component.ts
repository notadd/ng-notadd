import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableService } from './data-table.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

    displayedColumns: Array<string> = [
        'appName',
        'cateNames',
        'developCompanyFullName',
        'activeNums',
        'activeNumsRatio'
    ];
    columns: Array<string> = [
        'appName',
        'cateNames',
        'developCompanyFullName',
        'activeNums',
        'activeNumsRatio',
        'star',
    ];
    dataSource = [];
    columnsToDisplay: Array<string> = this.displayedColumns.slice();
    selectionTableColumns: Array<string> = [
        'select',
        'appName',
        'cateNames',
        'developCompanyFullName',
        'activeNums',
        'activeNumsRatio'
    ];

    paginatorTableDataSource: MatTableDataSource<Array<any>>;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    sortingTableDataSource: MatTableDataSource<Array<any>>;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    filteringTableDataSource: MatTableDataSource<Array<any>>;

    selectionTableDataSource: MatTableDataSource<Array<any>>;
    selection = new SelectionModel<Array<any>>(true, []);

    constructor(private dataTableService: DataTableService) {
        this.dataTableService.getStatisticalData().subscribe(data => {
            this.dataSource = data;

            this.paginatorTableDataSource = new MatTableDataSource(data);
            this.paginatorTableDataSource.paginator = this.paginator;

            this.sortingTableDataSource = new MatTableDataSource(data);
            this.sortingTableDataSource.sort = this.sort;

            this.filteringTableDataSource = new MatTableDataSource(data);

            this.selectionTableDataSource = new MatTableDataSource(data);
        });
    }

    ngOnInit() {}

    addColumn() {
        const columns = [ 'trend', 'cateIds', 'developCompanyAbbr', 'launchNums', 'concern', 'rank', 'id', 'runtimeNums', 'statDate', 'companyId', 'launchAvgPerson', 'runtimeAvgPerson'];
        const randomColumn = Math.floor(
            Math.random() * columns.length
        );
        if (!this.columnsToDisplay.includes(columns[randomColumn])) {
            this.columnsToDisplay.push(columns[randomColumn]);
        }
    }

    removeColumn() {
        if (this.columnsToDisplay.length > 1) {
            this.columnsToDisplay.pop();
        }
    }

    shuffle() {
        let currentIndex = this.columnsToDisplay.length;
        while (0 !== currentIndex) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            const temp = this.columnsToDisplay[currentIndex];
            this.columnsToDisplay[currentIndex] = this.columnsToDisplay[randomIndex];
            this.columnsToDisplay[randomIndex] = temp;
        }
    }

    applyFilter(filterValue: string) {
        this.filteringTableDataSource.filter = filterValue.trim().toLowerCase();
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.selectionTableDataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.selectionTableDataSource.data.forEach(row => this.selection.select(row));
    }

}
