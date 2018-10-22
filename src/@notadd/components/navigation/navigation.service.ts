import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotaddNavigationService {

    onItemCollapsed: Subject<any>;
    onItemCollapseToggled: Subject<any>;

    private _onNavigationChanged: BehaviorSubject<any>;
    private _onNavigationRegistered: BehaviorSubject<any>;
    private _onNavigationUnregistered: BehaviorSubject<any>;

    private currentNavigationKey: string;
    private navigationRegistry: { [key: string]: any };

    constructor() {
        this.onItemCollapsed = new Subject();
        this.onItemCollapseToggled = new Subject();

        this._onNavigationChanged = new BehaviorSubject(void (0));
        this._onNavigationRegistered = new BehaviorSubject(void (0));
        this._onNavigationUnregistered = new BehaviorSubject(void (0));

        this.currentNavigationKey = void (0);
        this.navigationRegistry = {};
    }

    get onNavigationChanged(): Observable<any> {
        return this._onNavigationChanged.asObservable();
    }

    get onNavigationRegistered(): Observable<any> {
        return this._onNavigationRegistered.asObservable();
    }

    get onNavigationUnregistered(): Observable<any> {
        return this._onNavigationUnregistered.asObservable();
    }

    /**
     * 根据指定key注册导航
     *
     * @param key
     * @param navigation
     */
    register(key, navigation): void {
        if (this.navigationRegistry[key]) {
            console.error(`The navigation with the key '${key}' already exists. Either unregister it first or use a unique key.`);

            return;
        }

        this.navigationRegistry[key] = navigation;

        this._onNavigationRegistered.next([key, navigation]);
    }

    /**
     * 根据指定key注销导航
     *
     * @param key
     */
    unregister(key): void {
        if (!this.navigationRegistry[key]) {
            console.warn(`The navigation with the key '${key}' doesn't exist in the registry.`);
        }

        delete this.navigationRegistry[key];

        this._onNavigationUnregistered.next(key);
    }

    /**
     * 根据指定key获取导航
     *
     * @param key
     * @returns {any}
     */
    getNavigation(key): any {
        if (!this.navigationRegistry[key]) {
            console.warn(`The navigation with the key '${key}' doesn't exist in the registry.`);

            return;
        }

        return this.navigationRegistry[key];
    }

    /**
     * 获取当前导航
     *
     * @returns {any}
     */
    getCurrentNavigation(): any {
        if (!this.currentNavigationKey) {
            console.warn(`The current navigation is not set.`);

            return;
        }

        return this.getNavigation(this.currentNavigationKey);
    }

    /**
     * 将指定key的导航设置为当前导航
     *
     * @param key
     */
    setCurrentNavigation(key): void {
        if (!this.navigationRegistry[key]) {
            console.warn(`The navigation with the key '${key}' doesn't exist in the registry.`);

            return;
        }

        this.currentNavigationKey = key;

        this._onNavigationChanged.next(key);
    }
}
