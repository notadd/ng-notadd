import { Component, OnInit } from '@angular/core';

import { NotaddConfigService } from '@notadd/services/config.service';

@Component({
    selector: 'lockscreen',
    templateUrl: './lockscreen.component.html',
    styleUrls: ['./lockscreen.component.scss']
})
export class LockscreenComponent implements OnInit {

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
