import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { NgxXLSXService } from '@notadd/ngx-xlsx';
import { NotaddTableExportPickerComponent } from '@notadd/components/table-export/table-export-picker.component';
import { NotaddUtils } from '@notadd/utils';

@Injectable()
export class NotaddExcelExportService {

    constructor(
        private ngxXLSXService: NgxXLSXService,
        private dialog: MatDialog
    ) {
    }

    public exportNormal(dataSource, excelFileName, headers?, sheetNames?) {
        const exportHeaders = Object.keys(headers).map(header => {
            return headers[header];
        });
        this.exportExcel(dataSource, excelFileName, exportHeaders, sheetNames);
    }

    exportSpecified(dataSource, excelFileName, headers?, sheetNames?) {
        const dialogRef = this.dialog.open(NotaddTableExportPickerComponent, {
            data: {
                headers,
                rowLength: dataSource.length
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (!result) { return; }

            const maxLength = dataSource.length;
            const rows = result.rowLength === maxLength ? maxLength : NotaddUtils.rowRangeTextToRowList(result.rowLength, maxLength) as Array<number>;
            const sheet = this.pickSheet(dataSource, rows, result.headers);
            const exportHeaders = result.headers.map(header => {
                return headers[header];
            });
            this.exportExcel(sheet, excelFileName, exportHeaders, sheetNames);
        });
    }

    private pickSheet(dataSource, rows: Array<number> | number, columns: Array<string>) {
        let sheet = [];
        if (Array.isArray(rows)) {
            rows.map(row => {
                sheet.push(dataSource[row - 1]);
            });
        } else if (Number(rows)) {
            sheet = dataSource.slice(0, rows);
        } else {
            sheet = dataSource.slice();
        }

        sheet = sheet.map((item) => {
            const obj = {};
            columns.map(column => {
                obj[column] = item[column];
            });
            return obj;
        });

        return sheet;
    }

    private exportExcel(json, excelFileName, headers?, sheetNames?) {
        this.ngxXLSXService.exportAsExcelFile(json, excelFileName, headers, sheetNames);
    }
}
