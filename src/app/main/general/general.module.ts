import { NgModule } from '@angular/core';

import { NotaddSharedModule } from '@notadd/shared.module';

import { GeneralRoutingModule } from './general-routing.module';

@NgModule(
    {
        imports: [
            NotaddSharedModule,
            GeneralRoutingModule
        ]
    }
)
export class GeneralModule {
}
