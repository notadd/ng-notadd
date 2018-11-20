import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatListModule
} from '@angular/material';

import { NotaddSharedModule } from '@notadd/shared.module';

import { ProfileComponent } from './profile/profile.component';
import { ErrorsComponent } from './errors/errors.component';

const routs: Routes = [
    {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
    },
    {
        path: 'profile',
        component: ProfileComponent,
        data: {
            title: '个人主页',
            hasContentHeader: false
        }
    },
    {
        path: 'errors/:code',
        component: ErrorsComponent,
        data: {
            title: '错误页',
            hasContentHeader: false
        }
    }
];

@NgModule({
    imports: [
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatListModule,

        NotaddSharedModule,

        RouterModule.forChild(routs)
    ],
    declarations: [
        ProfileComponent,
        ErrorsComponent
    ]
})
export class PagesModule {
}
