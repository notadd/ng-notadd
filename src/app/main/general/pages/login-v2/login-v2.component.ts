import { Component, OnInit } from '@angular/core';

import { NotaddConfigService } from '@notadd/services/config.service';

@Component({
    selector: 'login-v2',
    templateUrl: './login-v2.component.html',
    styleUrls: ['./login-v2.component.scss']
})
export class LoginV2Component implements OnInit {

    constructor(
        private notaddConfig: NotaddConfigService
    ) {
        this.notaddConfig.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
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
