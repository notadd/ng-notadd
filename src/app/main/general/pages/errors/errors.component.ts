import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'errors',
    templateUrl: './errors.component.html',
    styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnInit {

    code: string;

    constructor(private activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe(params => {
            this.code = params.code;
        });
    }

    ngOnInit() {
    }

}
