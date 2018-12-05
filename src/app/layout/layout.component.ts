import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Params } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil, filter, map, mergeMap } from 'rxjs/operators';

import { NotaddConfigService } from '@notadd/services/config.service';

@Component({
    selector: 'layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit, OnDestroy {

    /* 取消订阅主题 */
    private ngUnsubscribe: Subject<any>;

    notaddConfig: any;
    hasContentHeader: boolean;
    isMobile: boolean;

    constructor(
        private configService: NotaddConfigService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private breakpointObserver: BreakpointObserver
    ) {
        this.ngUnsubscribe = new Subject<any>();
        this.hasContentHeader = true;
    }

    ngOnInit() {
        this.configService.config
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(config => {
                this.notaddConfig = config;
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
            .subscribe((event) => {
                this.hasContentHeader = event['hasContentHeader'] === void (0) || event['hasContentHeader'];
            });

        this.breakpointObserver.observe([ Breakpoints.Handset ])
            .pipe(
                takeUntil(this.ngUnsubscribe),
                map(match => match.matches)
            )
            .subscribe(matches => {
                this.isMobile = matches;
                this.configService.config = {
                    layout: {
                        navbar: {
                            hidden: matches
                        }
                    }
                };
            });
    }

    /**
     * 单击 sidenav 背景事件
     */
    onBackdropClick(): void {
        this.configService.config = {
            layout: {
                navbar: {
                    hidden: true
                }
            }
        };
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
