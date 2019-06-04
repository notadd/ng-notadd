import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

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
