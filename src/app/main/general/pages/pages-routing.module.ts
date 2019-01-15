import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routingPathConfig } from '@config/routing-path.config';

import { ProfileComponent } from './profile/profile.component';
import { ErrorsComponent } from './errors/errors.component';
import { LoginComponent } from './login/login.component';
import { LoginV2Component } from './login-v2/login-v2.component';
import { RegisterComponent } from './register/register.component';
import { RegisterV2Component } from './register-v2/register-v2.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';

const routes: Routes = [
    {
        path: routingPathConfig.pages.default,
        redirectTo: routingPathConfig.pages.profile,
        pathMatch: 'full',
    },
    {
        path: routingPathConfig.pages.profile,
        component: ProfileComponent,
        data: {
            title: '个人主页',
            hasContentHeader: false
        }
    },
    {
        path: routingPathConfig.pages.errors,
        component: ErrorsComponent,
        data: {
            title: '错误页',
            isFullScreen: true
        }
    },
    {
        path: routingPathConfig.pages.login,
        component: LoginComponent,
        data: {
            title: '登录',
            isFullScreen: true
        }
    },
    {
        path: routingPathConfig.pages.loginV2,
        component: LoginV2Component,
        data: {
            title: '登录 V2',
            isFullScreen: true
        }
    },
    {
        path: routingPathConfig.pages.register,
        component: RegisterComponent,
        data: {
            title: '注册',
            isFullScreen: true
        }
    },
    {
        path: routingPathConfig.pages.registerV2,
        component: RegisterV2Component,
        data: {
            title: '注册 V2',
            isFullScreen: true
        }
    },
    {
        path: routingPathConfig.pages.forgotPassword,
        component: ForgotPasswordComponent,
        data: {
            title: '忘记密码',
            isFullScreen: true
        }
    },
    {
        path: routingPathConfig.pages.lockscreen,
        component: LockscreenComponent,
        data: {
            title: '锁定屏幕',
            isFullScreen: true
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [],
    exports: [
        RouterModule
    ]
})
export class PagesRoutingModule {
}
