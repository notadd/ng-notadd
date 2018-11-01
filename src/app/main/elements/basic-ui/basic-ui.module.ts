import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
} from '@angular/material';

import { NotaddSharedModule } from '@notadd/shared.module';

import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './cards/cards.component';
import { IconsComponent } from './icons/icons.component';

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
    },
    {
        path: 'icons',
        component: IconsComponent,
        data: {
            title: '图标',
            hasContentHeader: false
        }
    }
];

@NgModule({
    imports: [
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        NotaddSharedModule,

        RouterModule.forChild(routes)
    ],
    declarations: [
        ButtonsComponent,
        CardsComponent,
        IconsComponent
    ]
})
export class BasicUiModule {
}
