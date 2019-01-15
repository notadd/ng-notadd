import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RoutingPathPipe } from '@notadd/pipes/routing-path.pipe';
import { routingPathConfig } from '@config/routing-path.config';

@Component({
    selector: 'errors',
    templateUrl: './errors.component.html',
    styleUrls: ['./errors.component.scss'],
    providers: [ RoutingPathPipe ]
})
export class ErrorsComponent implements OnInit {

    code: string;
    routingPath: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private path: RoutingPathPipe
    ) {
        this.routingPath = routingPathConfig;
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            if (['400', '403', '404', '500', '503'].includes(params.code)) {
                this.code = params.code;
            }  else {
                // this.router.navigate(['/general/pages/errors/404']);
                this.router.navigate([
                    this.path.transform([
                        routingPathConfig.app.general,
                        routingPathConfig.general.pages,
                        routingPathConfig.pages.errors,
                        'test/:id'
                    ], {
                        code: 404,
                        id: '你大爷'
                    })
                ]);
            }
        });
    }

}
