import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NotaddSearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule
    ],
    declarations: [NotaddSearchBarComponent],
    exports: [NotaddSearchBarComponent]
})
export class NotaddSearchBarModule {
}
