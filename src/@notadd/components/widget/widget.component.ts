import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
    selector: 'notadd-widget',
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NotaddWidgetComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
