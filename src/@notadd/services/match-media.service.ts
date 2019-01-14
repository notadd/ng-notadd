import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class NotaddMatchMediaService {
    activeMediaQuery: string;
    onMediaChange: BehaviorSubject<string>;

    constructor(
        private mediaObserver: MediaObserver
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
        this.mediaObserver.media$
            .pipe(
                debounceTime(500),
                distinctUntilChanged()
            )
            .subscribe((change: MediaChange) => {
                if (this.activeMediaQuery !== change.mqAlias) {
                    this.activeMediaQuery = change.mqAlias;
                    this.onMediaChange.next(change.mqAlias);
                }
            });
    }

}
