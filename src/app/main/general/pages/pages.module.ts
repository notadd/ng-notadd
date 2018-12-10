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
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { RegisterComponent } from './register/register.component';
import { RegisterV2Component } from './register-v2/register-v2.component';

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
            isFullScreen: true
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
    },
    {
        path: 'register',
        component: RegisterComponent,
        data: {
            title: '注册',
            hasContentHeader: false
        }
    },
    {
        path: 'register-v2',
        component: RegisterV2Component,
        data: {
            title: '注册 V2',
            hasContentHeader: false
        }
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: {
            title: '忘记密码',
            hasContentHeader: false
        }
    },
    {
        path: 'lockscreen',
        component: LockscreenComponent,
        data: {
            title: '锁定屏幕',
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
        LoginV2Component,
        ForgotPasswordComponent,
        LockscreenComponent,
        RegisterComponent,
        RegisterV2Component
    ]
})
export class PagesModule {
}
