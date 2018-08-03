import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
  imports: [
  ],
  declarations: []
})
export class NotaddModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: NotaddModule
    ) {
        throwIfAlreadyLoaded(parentModule, 'NotaddModule');
    }
}
