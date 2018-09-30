import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatIconModule, MatToolbarModule } from '@angular/material';

import { NotaddSharedModule } from '@notadd/shared.module';

import { FooterComponent } from './footer.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
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
