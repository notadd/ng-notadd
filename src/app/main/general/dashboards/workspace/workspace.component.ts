import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

import { GridsterConfig, GridsterItem } from 'angular-gridster2';

import { GithubComponent } from './widgets/github/github.component';

@Component({
    selector: 'workspace',
    templateUrl: './workspace.component.html',
    styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

    options: GridsterConfig;
    widgets: Array<GridsterItem>;
    widgetComponents: Map<string, any>;
    editable: boolean;
    addWidgetForm: FormGroup;

    @ViewChild('addWidgetDialog', { static: true }) addWidgetDialog: TemplateRef<any>;
    @ViewChild('editGridsterDialog', { static: true }) editGridsterDialog: TemplateRef<any>;

    get widgetComponent() { return this.addWidgetForm.get('widgetComponent'); }

    constructor(
        private dialog: MatDialog,
        private formBuilder: FormBuilder
    ) {
        this.editable = false;
    }

    ngOnInit() {
        this.options = {
            gridType: 'fit',
            displayGrid: 'none',
            maxCols: 5,
            maxRows: 5,
            maxItemCols: 2,
            maxItemRows: 3,
            fixedColWidth: 150,
            fixedRowHeight: 150,
            swap: false,
            pushItems: true,
            draggable: {
                enabled: false,
            },
            resizable: {
                enabled: false,
            },
            disableWarnings: true
        };

        this.widgets = [
            {cols: 1, rows: 2, y: 0, x: 0, widget: 'github'},
            {cols: 1, rows: 1, y: 0, x: 1},
            {cols: 1, rows: 1, y: 0, x: 1},
            {cols: 1, rows: 1, y: 0, x: 0},
            {cols: 1, rows: 1, y: 3, x: 3},
            {cols: 1, rows: 1, y: 1, x: 0},
            {cols: 1, rows: 1, y: 1, x: 0},
            {cols: 1, rows: 1, y: 1, x: 0},
            {cols: 1, rows: 1, y: 1, x: 0},
            {cols: 1, rows: 1, y: 1, x: 0},
            {cols: 1, rows: 1, y: 1, x: 0},
            {cols: 1, rows: 1, y: 1, x: 0},
            {cols: 1, rows: 1, y: 0, x: 0},
            {cols: 1, rows: 1, y: 0, x: 0}
        ];

        this.widgetComponents = new Map<string, any>([
            [
                'github',
                {
                    label: 'github',
                    component: GithubComponent
                }
            ]
        ]);

        this.addWidgetForm = this.formBuilder.group({
            widgetComponent: ['', Validators.required],
        });
    }

    edit(): void {
        this.editable = !this.editable;
        this.options.draggable.enabled = this.options.resizable.enabled = this.editable;
        this.changedOptions();
    }

    addWidget(): void {
        const dialogRef = this.dialog.open(this.addWidgetDialog, {
            width: '300px',
            hasBackdrop: true,
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            result && this.widgets.push({ x: 0, y: 0, cols: 1, rows: 1, widget: this.addWidgetForm.value.widgetComponent});
        });
    }

    removeWidget(event, item): void {
        event.preventDefault();
        event.stopPropagation();
        this.widgets.splice(this.widgets.indexOf(item), 1);
    }

    editGridsterConfig() {
        const dialogRef = this.dialog.open(this.editGridsterDialog, {
            width: '500px',
            hasBackdrop: true,
            disableClose: true
        });
    }

    changedOptions() {
        if (this.options.api && this.options.api.optionsChanged) {
            this.options.api.optionsChanged();
        }
    }

}
