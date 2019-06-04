import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
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
            headers: new FormArray(this.optionHeaders.map(_ => new FormControl(true)), noEmpty()),
            row: this.formBuilder.group({
                type: ['all', Validators.required],
                length: ['']
            }, { validator: rowValidator(this.data.rowLength) })
        });
    }

    get headers() { return this.pickerForm.get('headers') as FormArray; }
    get row() { return this.pickerForm.get('row'); }
    get length() { return this.row.get('length'); }
    get type() { return this.row.get('type'); }
    get result(): DialogData {
        const selectedHeaderValues = this.pickerForm.value.headers
            .map((v, i) => v ? this.optionHeaders[i].value : void (0))
            .filter(v => v !== void (0));

        return {
            headers: selectedHeaderValues,
            rowLength: this.type.value === 'all' ? this.data.rowLength : this.length.value
        };
    }

    cancel(): void {
        this.dialogRef.close(false);
    }

    onLengthFocus() {
        this.row.get('type').setValue('specified');
    }

    resetLength() {
        if (this.type.value !== 'specified') {
            this.length.reset();
        }
    }
}

export const noEmpty = (): ValidatorFn => {
    return (control: FormArray): {[propName: string]: boolean} => {
        const totalSelected = control.controls
            // get a list of checkbox values (boolean)
            .map(control => control.value)
            // total up the number of checked checkboxes
            .reduce((prev, next) => next ? prev + next : prev, 0);

        return totalSelected > 0 ? void (0) : { empty: true };
    };
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
