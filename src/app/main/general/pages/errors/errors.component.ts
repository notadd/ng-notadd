import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'errors',
    templateUrl: './errors.component.html',
    styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnInit {

    code: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.activatedRoute.params.subscribe(params => {
            if (['400', '403', '404', '500', '503'].includes(params.code)) {
                this.code = params.code;
            }  else {
                this.router.navigate(['/general/pages/errors/404']);
            }
        });
    }

    ngOnInit() {
    }

}
