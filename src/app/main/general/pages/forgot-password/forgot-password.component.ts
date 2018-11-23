import { Component, OnInit } from '@angular/core';

import { NotaddConfigService } from '@notadd/services/config.service';

@Component({
    selector: 'forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

    constructor(
        private notaddConfig: NotaddConfigService
    ) {
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
