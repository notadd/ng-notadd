import { NgModule } from '@angular/core';

import {
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatBadgeModule,
    MatProgressBarModule
} from '@angular/material';

import { NotaddSharedModule } from '@notadd/shared.module';

import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './cards/cards.component';
import { IconsComponent } from './icons/icons.component';
import { ListComponent } from './list/list.component';

import { BasicUiRoutingModule } from './basic-ui-routing.module';
import { BadgesComponent } from './badges/badges.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

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
        MatProgressBarModule,

        NotaddSharedModule,

        BasicUiRoutingModule
    ],
    declarations: [
        ButtonsComponent,
        CardsComponent,
        IconsComponent,
        ListComponent,
        BadgesComponent,
        ProgressBarComponent
    ]
})
export class BasicUiModule {
}
