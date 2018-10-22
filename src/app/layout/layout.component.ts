import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NotaddConfigService } from '@notadd/services/config.service';

@Component({
    selector: 'layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit, OnDestroy {

    /* 取消订阅主题 */
    private ngUnsubscribe: Subject<any>;

    notaddConfig: any;

    constructor(
        private configService: NotaddConfigService
    ) {
        this.ngUnsubscribe = new Subject<any>();
    }

    ngOnInit() {
        this.configService.config
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(config => {
                this.notaddConfig = config;
            });
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
