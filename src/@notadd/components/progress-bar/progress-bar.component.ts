import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NotaddProgressBarService } from './progress-bar.service';

@Component({
    selector: 'notadd-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NotaddProgressBarComponent implements OnInit, OnDestroy {

    bufferValue: number;
    mode: 'determinate' | 'indeterminate' | 'buffer' | 'query';
    value: number;
    visible: boolean;

    /* 取消订阅主题 */
    private ngUnsubscribe: Subject<any>;

    constructor(
        private service: NotaddProgressBarService
    ) {
        this.ngUnsubscribe = new Subject<any>();
    }

    ngOnInit() {
        this.service.bufferValue
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((bufferValue) => {
                this.bufferValue = bufferValue;
            });

        this.service.mode
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((mode) => {
                this.mode = mode;
            });

        this.service.value
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((value) => {
                this.value = value;
            });

        this.service.visible
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((visible) => {
                this.visible = visible;
            });
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
