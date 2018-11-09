import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NotaddProgressBarService {

    private bufferValueSubject: BehaviorSubject<number>;
    private modeSubject: BehaviorSubject<string>;
    private valueSubject: BehaviorSubject<number>;
    private visibleSubject: BehaviorSubject<boolean>;

    constructor(
        private router: Router
    ) {
        this.bufferValueSubject = new BehaviorSubject(0);
        this.modeSubject = new BehaviorSubject('indeterminate');
        this.valueSubject = new BehaviorSubject(0);
        this.visibleSubject = new BehaviorSubject(false);

        this.subscribeRouterEvents();
    }

    // buffer value
    get bufferValue(): Observable<any> {
        return this.bufferValueSubject.asObservable();
    }

    setBufferValue(value: number): void {
        this.bufferValueSubject.next(value);
    }

    // mode
    get mode(): Observable<any> {
        return this.modeSubject.asObservable();
    }

    setMode(value: 'determinate' | 'indeterminate' | 'buffer' | 'query'): void {
        this.modeSubject.next(value);
    }

    // value
    get value(): Observable<any> {
        return this.valueSubject.asObservable();
    }

    setValue(value: number): void {
        this.valueSubject.next(value);
    }

    get visible(): Observable<any> {
        return this.visibleSubject.asObservable();
    }

    /* 订阅路由事件 设置进度条是否显示 */
    private subscribeRouterEvents(): void {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationStart))
            .subscribe(() => {
                this.setVisible(true);
            });

        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => {
                this.setVisible(false);
            });
    }

    // 设置进度条可见性
    setVisible(visible: boolean): void {
        this.visibleSubject.next(visible);
    }
}
