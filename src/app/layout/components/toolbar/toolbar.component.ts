import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import * as screenfull from 'screenfull';

import { NotaddConfigService } from '@notadd/services/config.service';
import { NotaddSidebarService } from '@notadd/components/sidebar/sidebar.service';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

    @Input()
    isMobile: boolean;

    rightNavbar: boolean;
    hiddenNavbar: boolean;
    collapseNavbar: boolean;
    notaddConfig: any;
    isFullscreen = false;
    languages: Array<any>;
    currentLanguage: any;
    isMoreToolbarVisible: boolean;

    /* 取消订阅主题 */
    private ngUnsubscribe: Subject<any>;

    constructor(
        private configService: NotaddConfigService,
        private sidebarService: NotaddSidebarService,
        private translateService: TranslateService,
        private router: Router
    ) {
        this.ngUnsubscribe = new Subject<any>();
        this.languages = [
            {
                code: 'zh-Hans',
                title: '简体中文'
            },
            {
                code: 'zh-Hant',
                title: '繁体中文'
            },
            {
                code: 'en',
                title: 'English'
            }
        ];
        this.isMoreToolbarVisible = false;
    }

    ngOnInit() {
        this.currentLanguage = this.languages.find((language) => {
            return language.code.includes(this.translateService.currentLang);
        });

        this.configService.config
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((config) => {
                this.notaddConfig = config;
                this.rightNavbar = config.layout.navbar.position === 'end';
                this.hiddenNavbar = config.layout.navbar.hidden;
                this.collapseNavbar = config.layout.navbar.collapsed;
            });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    /***
     * 切换全屏
     */
    toggleFullscreen() {
        if (screenfull.enabled) {
            screenfull.toggle();
            this.isFullscreen = !this.isFullscreen;
        }
    }

    /**
     * 切换侧边栏打开
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this.sidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * 切换侧边栏折叠
     */
    toggleSidenavCollapsed(): void {
        const config = {
            layout: {
                navbar: {
                    collapsed: !this.notaddConfig.layout.navbar.collapsed
                }
            }
        };

        if (this.notaddConfig.layout.navbar.hidden) {
            config.layout.navbar.collapsed = false;
        }

        this.configService.config = config;
    }

    /**
     * 切换侧边栏可见性
     */
    toggleSidenavVisibility(): void {
        this.configService.config = {
            layout: {
                navbar: {
                    hidden: !this.notaddConfig.layout.navbar.hidden
                }
            }
        };
    }

    /* 全局搜索 */
    search(event): void {
        console.log(event.value);
    }

    /**
     * 设置语言
     *
     * @param lang
     */
    setLanguage(lang): void {
        this.currentLanguage = lang;
        this.translateService.use(lang.code);
    }

    /**
     * 切换移动端更多工具栏可见
     */
    toggleMoreToolbarVisible(): void {
        this.isMoreToolbarVisible = !this.isMoreToolbarVisible;
    }

    /**
     * 菜单按钮点击
     */
    onMenuButtonClick(): void {
        this.isMobile ? this.toggleSidenavVisibility() : this.toggleSidenavCollapsed();
    }

    /**
     * 锁屏按钮点击
     */
    onLockButtonClick(): void {
        this.router.navigate(['/general/pages/lockscreen']);
    }
}
