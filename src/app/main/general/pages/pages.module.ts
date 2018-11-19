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
        ProfileComponent
    ]
})
export class PagesModule {
}
