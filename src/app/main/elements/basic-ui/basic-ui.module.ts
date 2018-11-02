import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule
} from '@angular/material';

import { NotaddSharedModule } from '@notadd/shared.module';

import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './cards/cards.component';
import { IconsComponent } from './icons/icons.component';
import { ListComponent } from './list/list.component';

import { BasicUiRoutingModule } from './basic-ui-routing.module';
import { BadgesComponent } from './badges/badges.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ButtonToggleComponent } from './button-toggle/button-toggle.component';
import { ChipsComponent } from './chips/chips.component';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';

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
        MatButtonToggleModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatNativeDateModule,

        FormsModule,
        ReactiveFormsModule,

        NotaddSharedModule,

        BasicUiRoutingModule
    ],
    declarations: [
        ButtonsComponent,
        CardsComponent,
        IconsComponent,
        ListComponent,
        BadgesComponent,
        ProgressBarComponent,
        ButtonToggleComponent,
        ChipsComponent,
        ExpansionPanelComponent
    ]
})
export class BasicUiModule {
}
