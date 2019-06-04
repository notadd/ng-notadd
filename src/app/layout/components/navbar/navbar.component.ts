import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';

import { NotaddConfigService } from '@notadd/services/config.service';
import { NotaddPerfectScrollbarDirective } from '@notadd/directives/perfect-scrollbar/perfect-scrollbar.directive';
import { NotaddSidebarService } from '@notadd/components/sidebar/sidebar.service';
import { NotaddNavigationService } from '@notadd/components/navigation/navigation.service';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit, OnDestroy {

    notaddConfig: any;
    notaddPerfectScrollbarUpdateTimeout: any;

    private notaddPerfectScrollbar: NotaddPerfectScrollbarDirective;
    private ngUnsubscribe: Subject<any>;

    constructor(
        private configService: NotaddConfigService,
        private sidebarService: NotaddSidebarService,
        private navigationService: NotaddNavigationService,
        private router: Router,
    ) {
        this.ngUnsubscribe = new Subject<any>();
    }

    // Directive
    @ViewChild(NotaddPerfectScrollbarDirective, { static: true })
    set directive(theDirective: NotaddPerfectScrollbarDirective) {
        if (!theDirective) {
            return;
        }

        this.notaddPerfectScrollbar = theDirective;

        // 切换导航项折叠改变时更新滚动条
        this.navigationService.onItemCollapseToggled
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
                this.notaddPerfectScrollbarUpdateTimeout = setTimeout(() => {
                    this.notaddPerfectScrollbar.update();
                }, 310);
            });

        // 将滚动条滚动到当前激活的导航项
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                take(1)
            )
            .subscribe(() => {
                setTimeout(() => {
                    const activeNavItem: any = document.querySelector('navbar .nav-link.active');

                    if (activeNavItem) {
                        const activeItemOffsetTop = activeNavItem.offsetTop,
                            activeItemOffsetParentTop = activeNavItem.offsetParent.offsetTop,
                            scrollDistance = activeItemOffsetTop - activeItemOffsetParentTop - (48 * 3) - 168;
                        this.notaddPerfectScrollbar.scrollToTop(scrollDistance);
                    }
                }, 1000);
            });
    }

    ngOnInit() {
        // 订阅配置改变
        this.configService.config
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((config) => {
                this.notaddConfig = config;
            });
    }

    ngOnDestroy(): void {
        if (this.notaddPerfectScrollbarUpdateTimeout) {
            clearTimeout(this.notaddPerfectScrollbarUpdateTimeout);
        }

        // 取消订阅
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
