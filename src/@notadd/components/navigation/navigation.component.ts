import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NotaddNavigationService } from '@notadd/components/navigation/navigation.service';

@Component({
    selector: 'notadd-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NotaddNavigationComponent implements OnInit {

    @Input()
    navigation: any;

    private ngUnsubscribe: Subject<any>;

    constructor(
        private navigationService: NotaddNavigationService
    ) {
        this.ngUnsubscribe = new Subject<any>();
    }

    ngOnInit() {
        this.navigation = this.navigation || this.navigationService.getCurrentNavigation();

        // 订阅当前导航的改变
        this.navigationService.onNavigationChanged
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
                this.navigation = this.navigationService.getCurrentNavigation();
            });
    }

}
