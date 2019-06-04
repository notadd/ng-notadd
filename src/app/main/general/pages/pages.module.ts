import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgxCaptchaModule } from 'ngx-captcha';

import { NotaddSharedModule } from '@notadd/shared.module';

import { PagesRoutingModule } from './pages-routing.module';

import { ProfileComponent } from './profile/profile.component';
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
        MatProgressBarModule,
        MatTooltipModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireAuthModule,

        NgxCaptchaModule,

        NotaddSharedModule,

        PagesRoutingModule
    ],
    declarations: [
        ProfileComponent,
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
