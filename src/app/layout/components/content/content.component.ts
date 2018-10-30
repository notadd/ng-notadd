import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
    selector: 'content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements OnInit {

    @Input()
    hasHeader: boolean;

    constructor() {
    }

    ngOnInit() {
    }

}
