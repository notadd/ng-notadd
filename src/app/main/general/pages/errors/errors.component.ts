import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NotaddConfigService } from '@notadd/services/config.service';

@Component({
    selector: 'errors',
    templateUrl: './errors.component.html',
    styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnInit {

    code: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private notaddConfig: NotaddConfigService
    ) {
        this.activatedRoute.params.subscribe(params => {
            this.code = params.code;
        });

        this.notaddConfig.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    ngOnInit() {
    }

}
