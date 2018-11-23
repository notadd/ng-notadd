import { Component, OnInit } from '@angular/core';

import { NotaddConfigService } from '@notadd/services/config.service';

@Component({
    selector: 'register-v2',
    templateUrl: './register-v2.component.html',
    styleUrls: ['./register-v2.component.scss']
})
export class RegisterV2Component implements OnInit {

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
