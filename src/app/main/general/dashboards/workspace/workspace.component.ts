import { Component, OnInit } from '@angular/core';
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

    constructor() {
        this.editable = false;
    }

    static itemChange(item, itemComponent) {
        console.info('itemChanged', item, itemComponent);
    }

    static itemResize(item, itemComponent) {
        console.info('itemResized', item, itemComponent);
    }

    ngOnInit() {
        this.options = {
            maxCols: 5,
            maxRows: 5,
            maxItemCols: 2,
            maxItemRows: 3,
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
            {cols: 1, rows: 1, y: 0, x: 0},
            {cols: 1, rows: 1, y: 5, x: 5},
        ];

        this.widgetComponents = new Map<string, any>([
            ['github', GithubComponent]
        ]);
    }

    edit() {
        this.editable = !this.editable;
        this.options.draggable.enabled = this.options.resizable.enabled = this.editable;
        this.changedOptions();
    }

    changedOptions() {
        this.options.api.optionsChanged();
    }

}
