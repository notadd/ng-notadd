import { Inject, Injectable, InjectionToken } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as _ from 'lodash';

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
        // provided config (from forRoot)
        @Inject(NOTADD_CONFIG) private customConfig
    ) {
        // 设置默认config
        this.defaultConfig = customConfig;

        // 初始化
        this.init();
    }

    set config(value) {
        let config = this.configSubject.getValue();

        // 合并config
        config = _.merge({}, config, value);

        this.configSubject.next(config);
    }

    get config(): Observable<any> {
        return this.configSubject.asObservable();
    }

    private init(): void {
        // 移动端浏览器中禁用自定义滚动条
        if (this.platform.ANDROID || this.platform.IOS) {
            this.defaultConfig.customScrollbars = false;
        }

        this.configSubject = new BehaviorSubject(_.cloneDeep(this.defaultConfig));

        // 如果当前config与默认config不同，则在每次导航开始时重新加载默认config
        this.router.events
            .pipe(filter(event => event instanceof NavigationStart))
            .subscribe(() => {
                if (!_.isEqual(this.configSubject.getValue(), this.defaultConfig)) {

                    const config = _.cloneDeep(this.defaultConfig);

                    this.configSubject.next(config);
                }
            });
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
