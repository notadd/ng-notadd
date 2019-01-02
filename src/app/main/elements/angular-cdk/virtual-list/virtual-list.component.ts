import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { VirtualListService } from './virtual-list.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'virtual-list',
    templateUrl: './virtual-list.component.html',
    styleUrls: ['./virtual-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VirtualListComponent implements OnInit {

    items: Array<any>;

    content: Array<number>;

    fixedSizeData: Array<number>;

    states: Observable<Array<any>>;

    constructor(private virtualListService: VirtualListService) {
        this.items = Array.from({length: 100000}).map((_, i) => `Item #${i}`);

        this.content = [1];

        this.fixedSizeData = this.virtualListService.FIXED_SIZE;

        this.states = Observable.create(observer => {
            observer.next(this.virtualListService.STATES);
            observer.complete();
        });
    }

    ngOnInit() {
    }

    appendContent() {
        this.content = this.content.concat(Array(5).fill(1));
    }

    sortBy(prop: 'name' | 'capital') {
        const sortedVals = this.virtualListService.STATES.map(s => ({ ...s })).sort((a, b) => {
            const aProp = a[prop], bProp = b[prop];
            if (aProp < bProp) {
                return -1;
            } else if (aProp > bProp) {
                return 1;
            }
            return 0;
        });

        this.states = Observable.create(observer => {
            observer.next(sortedVals);
            observer.complete();
        });
    }

}
