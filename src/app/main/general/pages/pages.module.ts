import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
} from '@angular/material';

import { NotaddSharedModule } from '@notadd/shared.module';

import { ProfileComponent } from './profile/profile.component';
import { ErrorsComponent } from './errors/errors.component';
import { LoginComponent } from './login/login.component';
import { LoginV2Component } from './login-v2/login-v2.component';

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
    },
    {
        path: 'login',
        component: LoginComponent,
        data: {
            title: '登录',
            hasContentHeader: false
        }
    },
    {
        path: 'login-v2',
        component: LoginV2Component,
        data: {
            title: '登录 V2',
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
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,

        NotaddSharedModule,

        RouterModule.forChild(routs)
    ],
    declarations: [
        ProfileComponent,
        ErrorsComponent,
        LoginComponent,
        LoginV2Component
    ]
})
export class PagesModule {
}
