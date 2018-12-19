import { NgModule } from '@angular/core';

import { NotaddPerfectScrollbarDirective } from './perfect-scrollbar/perfect-scrollbar.directive';
import { NotaddInfiniteScrollableDirective } from './infinite-scrollable/infinite-scrollable.directive';

@NgModule({
    imports: [],
    declarations: [
        NotaddPerfectScrollbarDirective,
        NotaddInfiniteScrollableDirective
    ],
    exports: [
        NotaddPerfectScrollbarDirective,
        NotaddInfiniteScrollableDirective
    ]
})
export class NotaddDirectivesModule {
}
