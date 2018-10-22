import { Component, HostBinding, Input, OnInit } from '@angular/core';

import { NotaddNavigationItem } from '@notadd/types';

@Component({
    selector: 'notadd-nav-group',
    templateUrl: './nav-group.component.html',
    styleUrls: ['./nav-group.component.scss']
})
export class NotaddNavGroupComponent implements OnInit {

    @HostBinding('class')
    classes = 'nav-group nav-item';

    @Input()
    item: NotaddNavigationItem;

    constructor() {
    }

    ngOnInit() {
    }

}
