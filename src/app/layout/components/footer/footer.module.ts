import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatToolbarModule } from '@angular/material';

import { NotaddSharedModule } from '@notadd/shared.module';

import { FooterComponent } from './footer.component';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,

        NotaddSharedModule
    ],
    declarations: [ FooterComponent ],
    exports: [ FooterComponent ]
})
export class FooterModule {
}
