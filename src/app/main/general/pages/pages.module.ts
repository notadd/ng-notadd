import { NgModule } from '@angular/core';

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

import { PagesRoutingModule } from './pages-routing.module';

import { ProfileComponent } from './profile/profile.component';
import { ErrorsComponent } from './errors/errors.component';
import { LoginComponent } from './login/login.component';
import { LoginV2Component } from './login-v2/login-v2.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { RegisterComponent } from './register/register.component';
import { RegisterV2Component } from './register-v2/register-v2.component';

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

        PagesRoutingModule
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
