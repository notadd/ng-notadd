import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NotaddConfigService } from '@notadd/services/config.service';
import { NotaddLoadingService } from '@notadd/services/notadd-loading.service';

@Component({
    selector: 'notadd-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    notaddConfig: any;

    private ngUnsubscribe: Subject<any>;

    constructor(
        @Inject(DOCUMENT) private document: any,
        private loadingService: NotaddLoadingService,
        private configService: NotaddConfigService,
        private platform: Platform
    ) {
        // Add is-mobile class to the body if the platform is mobile
        if (this.platform.ANDROID || this.platform.IOS) {
            this.document.body.classList.add('is-mobile');
        }

        // Set the private defaults
        this.ngUnsubscribe = new Subject();
    }

    ngOnInit() {
        this.configService.config
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(config => {
                this.notaddConfig = config;

                this.notaddConfig.layout.width === 'boxed' ?
                this.document.body.classList.add('boxed') :
                this.document.body.classList.remove('boxed');
            });
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
