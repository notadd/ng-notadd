import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotaddMatchMediaService {
    activeMediaQuery: string;
    onMediaChange: BehaviorSubject<string>;

    constructor(
        private observableMedia: ObservableMedia
    ) {
        this.activeMediaQuery = '';
        this.onMediaChange = new BehaviorSubject<string>('');

        this.init();

    }

    /**
     * 初始化
     *
     * @private
     */
    private init(): void {
        this.observableMedia
            .subscribe((change: MediaChange) => {
                if (this.activeMediaQuery !== change.mqAlias) {
                    this.activeMediaQuery = change.mqAlias;
                    this.onMediaChange.next(change.mqAlias);
                }
            });
    }

}
