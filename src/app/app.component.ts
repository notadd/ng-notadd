import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { Router, ActivatedRoute, NavigationEnd, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, filter, map, mergeMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { NotaddConfigService } from '@notadd/services/config.service';
import { NotaddLoadingService } from '@notadd/services/notadd-loading.service';
import { NotaddTranslationService } from '@notadd/services/translation.service';
import { NotaddNavigationService } from '@notadd/components/navigation/navigation.service';
import { NotaddSidebarService } from '@notadd/components/sidebar/sidebar.service';

import { navigation } from './navigation/navigation';
import { locale as navigationZh_Hant } from './navigation/i18n/zh-Hant';
import { locale as navigationZh_Hans } from './navigation/i18n/zh-Hans';
import { locale as navigationEnglish } from './navigation/i18n/en';

@Component({
    selector: 'notadd-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    notaddConfig: any;
    navigation: any;

    /* 是否全屏页面 */
    isFullScreen: boolean;

    private ngUnsubscribe: Subject<any>;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        @Inject(DOCUMENT) private document: any,
        private loadingService: NotaddLoadingService,
        private configService: NotaddConfigService,
        private navigationService: NotaddNavigationService,
        private translateService: TranslateService,
        private notaddTranslationService: NotaddTranslationService,
        private platform: Platform,
        private sidebarService: NotaddSidebarService
    ) {
        this.navigation = navigation;

        this.isFullScreen = false;

        // 注册导航
        this.navigationService.register('main', this.navigation);

        // 设置key为 `main` 的导航为当前导航
        this.navigationService.setCurrentNavigation('main');

        // Add new langs to the list
        this.translateService.addLangs(['zh-Hans', 'zh-Hant', 'en']);

        // Sets the default language to use as a fallback
        this.translateService.setDefaultLang('zh-Hans');

        // Manually sets an object of translations for a given language
        this.notaddTranslationService.setTranslation([navigationZh_Hans, navigationZh_Hant, navigationEnglish]);

        // Use the browser's default lang, if the lang isn't available, it will use the 'zh-Hans'
        const browserLang = this.translateService.getBrowserLang();
        this.translateService.use(browserLang.match(/en|zh/) ? browserLang : 'zh-Hans');

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

        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),  // 筛选原始的Observable：this.router.events
                map(() => this.activatedRoute),
                map(route => {
                    while (route.firstChild) {
                        route = route.firstChild;
                    }
                    return route;
                }),
                mergeMap(route => route.data)
            )
            .subscribe((data) => {
                this.isFullScreen = !data['isFullScreen'] === void (0) || data['isFullScreen'];
            });
    }

    /**
     * 切换侧边栏打开
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this.sidebarService.getSidebar(key).toggleOpen();
    }

    ngOnDestroy() {
        /* 取消订阅 */
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
