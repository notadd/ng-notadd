import { Component, OnInit, HostBinding, Input } from '@angular/core';

import { NotaddNavigationItem } from '@notadd/types';

@Component({
    selector: 'notadd-nav-item',
    templateUrl: './nav-item.component.html',
    styleUrls: ['./nav-item.component.scss']
})
export class NotaddNavItemComponent implements OnInit {

    @HostBinding('class')
    classes = 'nav-item';

    @Input()
    item: NotaddNavigationItem;

    constructor() {
    }

    ngOnInit() {
    }

}
