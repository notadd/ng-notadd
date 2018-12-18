import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { NOTADD_CONFIG } from '@notadd/services/config.service';
import { NotaddConfig } from '@notadd/types';

@NgModule()
export class NotaddModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: NotaddModule
    ) {
        throwIfAlreadyLoaded(parentModule, 'NotaddModule');
    }

    static forRoot(config: NotaddConfig): ModuleWithProviders {
        return {
            ngModule : NotaddModule,
            providers: [
                {
                    provide : NOTADD_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
