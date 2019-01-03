import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { RoleService } from './role.service';

@Component({
    selector: 'role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RoleComponent implements OnInit {

    role: any;
    pageType: string;

    constructor(private service: RoleService) {
        this.role = {};
        this.pageType = 'new';
    }

    ngOnInit() {
    }

}
