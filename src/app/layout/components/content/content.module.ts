import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NotaddSharedModule } from '@notadd/shared.module';

import { HeaderModule } from './header/header.module';
import { ContentComponent } from './content.component';

@NgModule({
    imports: [
        NotaddSharedModule,
        HeaderModule,
        RouterModule
    ],
    declarations: [ ContentComponent ],
    exports: [ ContentComponent ]
})
export class ContentModule {
}
