import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NotaddConfigService } from '@notadd/services/config.service';
import { NotaddLoadingService } from '@notadd/services/notadd-loading.service';
import { NotaddNavigationService } from '@notadd/components/navigation/navigation.service';

import { navigation } from './navigation/navigation';

@Component({
    selector: 'notadd-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    notaddConfig: any;
    navigation: any;

    private ngUnsubscribe: Subject<any>;

    constructor(
        @Inject(DOCUMENT) private document: any,
        private loadingService: NotaddLoadingService,
        private configService: NotaddConfigService,
        private navigationService: NotaddNavigationService,
        private platform: Platform
    ) {
        this.navigation = navigation;

        // 注册导航
        this.navigationService.register('main', this.navigation);

        // 设置key为 `main` 的导航为当前导航
        this.navigationService.setCurrentNavigation('main');

        // 在移动端平台上添加 `is-mobile` 类
        if (this.platform.ANDROID || this.platform.IOS) {
            this.document.body.classList.add('is-mobile');
        }

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
        /* 取消订阅 */
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
