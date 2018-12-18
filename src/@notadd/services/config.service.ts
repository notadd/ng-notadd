import { Inject, Injectable, InjectionToken } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';

import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';
import { NgForage } from 'ngforage';

export const NOTADD_CONFIG = new InjectionToken('notaddCustomConfig');

@Injectable({
    providedIn: 'root'
})
export class NotaddConfigService {

    private configSubject: BehaviorSubject<any>;

    readonly defaultConfig: any;

    constructor(
        private platform: Platform,
        private router: Router,
        @Inject(NOTADD_CONFIG) private customConfig,
        private ngForage: NgForage
    ) {
        // 设置默认config
        this.defaultConfig = customConfig;

        // 初始化
        this.init();
    }

    set config(value: any) {
        let config = this.configSubject.getValue();

        // 合并config
        config = _.merge({}, config, value);

        this.configSubject.next(config);

        /* 如果当前配置跟默认配置不同，则存储到本地缓存 */
        if (!_.isEqual(config.layout, this.defaultConfig.layout)) {
            this.ngForage.setItem('NOTADD_CONFIG', config);
        }
    }

    get config(): any | Observable<any> {
        return this.configSubject.asObservable();
    }

    private init() {
        // 移动端浏览器中禁用自定义滚动条
        if (this.platform.ANDROID || this.platform.IOS) {
            this.defaultConfig.customScrollbars = false;
        }

        this.configSubject = new BehaviorSubject(_.cloneDeep(this.defaultConfig));
    }

    setConfig(value, opts = {emitEvent: true}): void {
        let config = this.configSubject.getValue();

        config = _.merge({}, config, value);

        if (opts.emitEvent === true) {
            this.configSubject.next(config);
        }
    }

    getConfig(): Observable<any> {
        return this.configSubject.asObservable();
    }

    /* 重置为默认config */
    resetToDefaults(): void {
        this.configSubject.next(_.cloneDeep(this.defaultConfig));
    }
}
