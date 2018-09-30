import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { Subject } from 'rxjs';

import * as screenfull from 'screenfull';

import { NotaddConfigService } from '@notadd/services/config.service';
import { NotaddSidebarService } from '@notadd/components/sidebar/sidebar.service';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

    isFullscreen = false;

    /* 取消订阅主题 */
    private ngUnsubscribe: Subject<any>;

    constructor(
        private configService: NotaddConfigService,
        private sidebarService: NotaddSidebarService,
        private matIconRegistry: MatIconRegistry
    ) {

    }

    ngOnInit() {
        /* 自定义icon font*/
        this.matIconRegistry.registerFontClassAlias('NotaddIcon', 'notadd-icon');

        this.configService.config.subscribe(console.log);
    }

    /***
     * Toggle fullscreen
     */
    toggleFullscreen() {
        if (screenfull.enabled) {
            screenfull.toggle();
            this.isFullscreen = !this.isFullscreen;
        }
    }

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this.sidebarService.getSidebar(key).toggleOpen();
    }
}
