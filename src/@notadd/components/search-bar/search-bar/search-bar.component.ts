import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NotaddConfigService } from '@notadd/services/config.service';

@Component({
    selector: 'notadd-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss']
})
export class NotaddSearchBarComponent implements OnInit, OnDestroy {

    collapsed: boolean;
    notaddConfig: any;

    @Output()
    input: EventEmitter<any>;

    /* 取消订阅主题 */
    private ngUnsubscribe: Subject<any>;

    constructor(
        private configService: NotaddConfigService,
    ) {
        this.input = new EventEmitter();
        this.collapsed = true;

        this.ngUnsubscribe = new Subject();
    }

    ngOnInit() {
        this.configService.config
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
                (config) => {
                    this.notaddConfig = config;
                }
            );
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    /**
     * 折叠
     */
    collapse(): void {
        this.collapsed = true;
    }

    /**
     * 展开
     */
    expand(): void {
        this.collapsed = false;
    }

    /**
     * 搜索
     * @param event
     */
    search(event): void {
        this.input.emit(event.target.value);
    }
}
