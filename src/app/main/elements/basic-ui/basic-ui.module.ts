import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatBadgeModule
} from '@angular/material';

import { NotaddSharedModule } from '@notadd/shared.module';

import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './cards/cards.component';
import { IconsComponent } from './icons/icons.component';
import { ListComponent } from './list/list.component';

import { BasicUiRoutingModule } from './basic-ui-routing.module';
import { BadgesComponent } from './badges/badges.component';

@NgModule({
    imports: [
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatBadgeModule,

        NotaddSharedModule,

        BasicUiRoutingModule
    ],
    declarations: [
        ButtonsComponent,
        CardsComponent,
        IconsComponent,
        ListComponent,
        BadgesComponent
    ]
})
export class BasicUiModule {
}
