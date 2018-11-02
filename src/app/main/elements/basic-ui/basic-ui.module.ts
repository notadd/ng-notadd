import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
} from '@angular/material';

import { NotaddSharedModule } from '@notadd/shared.module';

import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './cards/cards.component';
import { IconsComponent } from './icons/icons.component';
import { ListComponent } from './list/list.component';

import { BasicUiRoutingModule } from './basic-ui-routing.module';

@NgModule({
    imports: [
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,

        NotaddSharedModule,

        BasicUiRoutingModule
    ],
    declarations: [
        ButtonsComponent,
        CardsComponent,
        IconsComponent,
        ListComponent
    ]
})
export class BasicUiModule {
}
