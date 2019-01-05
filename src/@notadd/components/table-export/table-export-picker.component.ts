import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { filter } from 'rxjs/operators';

import { NotaddUtils } from '@notadd/utils';

export interface DialogData {
    headers: Array<string>;
    rowLength: number;
}

@Component({
    selector: 'table-export-picker',
    templateUrl: './table-export-picker.component.html',
    styleUrls: ['./table-export-picker.component.scss']
})
export class NotaddTableExportPickerComponent implements OnInit {
    pickerForm: FormGroup;
    optionHeaders: Array<{
        value: string,
        label: string
    }> = [];
    constructor(
        public dialogRef: MatDialogRef<NotaddTableExportPickerComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private formBuilder: FormBuilder
    ) {
        Object.keys(this.data.headers).map(key => {
            this.optionHeaders.push({
                value: key,
                label: this.data.headers[key]
            });
        });
    }

    ngOnInit() {
        this.pickerForm = this.formBuilder.group({
            headers: [Object.keys(this.data.headers), noEmpty],
            row: this.formBuilder.group({
                type: ['all', Validators.required],
                length: ['']
            }, { validator: rowValidator(this.data.rowLength) })
        });
    }
    get headers() { return this.pickerForm.get('headers'); }
    get row() { return this.pickerForm.get('row'); }
    get length() { return this.row.get('length'); }
    get type() { return this.row.get('type'); }
    set type(value) {
        this.row.get('type').setValue(value);
    }
    get result(): DialogData {
        return {
            headers: this.headers.value,
            rowLength: this.type.value === 'all' ? this.data.rowLength : this.length.value
        };
    }

    cancel(): void {
        this.dialogRef.close();
    }

    resetLength() {
        if (this.type.value !== 'specified') {
            this.length.reset();
        }
    }
}

export const noEmpty = (control: AbstractControl): {[propName: string]: boolean} => {
    return !!control.value.length ? void (0) : { empty: true };
};

export const rowValidator = (maxLength: number): ValidatorFn => {
    return (control: FormGroup): {[propName: string]: boolean} => {
        const { value } = control.get('length');
        const type = control.get('type');
        if (type.value !== 'specified') {
            return void (0);
        }
        if (isNaN(Number(value)) && !/^([0-9]|\d|、|-|,)*$/.test(value)) {
            return { lengthInvalid: true };
        } else if (value <= 0 || value > maxLength) {
            return { outOfRange: true };
        } else if (NotaddUtils.rowRangeTextToRowList(value, maxLength) === NotaddUtils.RowRangeStatus.LIMIT_ERROR) {
            return { outOfRange: true };
        } else if (NotaddUtils.rowRangeTextToRowList(value, maxLength) === NotaddUtils.RowRangeStatus.SYNTAX_ERROR) {
            return { lengthInvalid: true };
        }
    };
};
