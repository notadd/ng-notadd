import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
} from '@angular/material';

import { NotaddSharedModule } from '@notadd/shared.module';

import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './cards/cards.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'buttons',
        pathMatch: 'full',
    },
    {
        path: 'buttons',
        component: ButtonsComponent,
        data: {
            title: '按钮',
            hasContentHeader: true
        }
    },
    {
        path: 'cards',
        component: CardsComponent,
        data: {
            title: '卡片',
            hasContentHeader: true
        }
    }
];

@NgModule({
    imports: [
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatCardModule,
        NotaddSharedModule,

        RouterModule.forChild(routes)
    ],
    declarations: [
        ButtonsComponent,
        CardsComponent
    ]
})
export class BasicUiModule {
}
