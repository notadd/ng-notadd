import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatDividerModule, MatIconModule } from '@angular/material';

import { NotaddSharedModule } from '@notadd/shared.module';

import { ButtonsComponent } from './buttons/buttons.component';

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
    }
];

@NgModule({
    imports: [
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        NotaddSharedModule,

        RouterModule.forChild(routes)
    ],
    declarations: [ButtonsComponent]
})
export class BasicUiModule {
}
