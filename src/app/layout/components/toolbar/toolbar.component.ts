import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as screenfull from 'screenfull';

import { NotaddConfigService } from '@notadd/services/config.service';
import { NotaddSidebarService } from '@notadd/components/sidebar/sidebar.service';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

    rightNavbar: boolean;
    hiddenNavbar: boolean;
    collapseNavbar: boolean;
    notaddConfig: any;
    isFullscreen = false;

    /* 取消订阅主题 */
    private ngUnsubscribe: Subject<any>;

    constructor(
        private configService: NotaddConfigService,
        private sidebarService: NotaddSidebarService,
        private matIconRegistry: MatIconRegistry
    ) {
        this.ngUnsubscribe = new Subject<any>();
    }

    ngOnInit() {
        /* 自定义icon font*/
        this.matIconRegistry.registerFontClassAlias('NotaddIcon', 'notadd-icon');

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
    toggleSidebarCollapsed(): void {
        const config = Object.assign({}, this.notaddConfig, {
            layout: {
                navbar: {
                    collapsed: !this.notaddConfig.layout.navbar.collapsed
                }
            }
        });

        if (this.notaddConfig.layout.navbar.hidden) {
            config.layout.navbar.hidden = false;
            config.layout.navbar.collapsed = false;
        }

        this.configService.config = config;
    }
}
