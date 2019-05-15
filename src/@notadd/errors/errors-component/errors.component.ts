import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

import { NotaddErrorsService } from '../errors.service';

@Component({
    selector: 'notadd-errors',
    templateUrl: './errors.component.html',
    styleUrls: ['./errors.component.scss'],
})
export class NotaddErrorsComponent implements OnInit {

    code: string;
    errorDescription: Map<number | string, string>;
    errorInfo: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) {
        this.errorDescription = new Map<number | string, string>([
            [ 400, 'Bad Request :(' ],
            [ 403, 'Forbidden :(' ],
            [ 404, 'Page Not Found :(' ],
            [ 500, 'Internal Server Error :(' ],
            [ 502, 'Bad Gateway :(' ],
            [ 503, 'Service Unavailable :(' ]
        ]);
    }

    ngOnInit() {
        this.activatedRoute
            .queryParams
            .pipe(
                filter(errorInfo => !!errorInfo)
            )
            .subscribe(errorInfo => {
                this.errorInfo = errorInfo;
                this.errorDescription.set(errorInfo.name, errorInfo.message);
            });

        this.activatedRoute.params.subscribe(params => {
            if (['400', '403', '404', '500', '503', 'Error'].includes(params.code)) {
                this.code = params.code;
            } else {
                this.router.navigate(['/error', 404]);
            }
        });
    }

}
