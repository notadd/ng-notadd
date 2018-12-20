import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ReCaptchaV3Service } from 'ngx-captcha';

import { environment } from 'environments/environment';
import { LoginGQL } from 'app/graphql/graphql.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    private reCaptchaToken: string;
    readonly siteKey: string;
    loginForm: FormGroup;
    isLoading: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private reCaptchaV3Service: ReCaptchaV3Service,
        private loginGql: LoginGQL,
        private snackBar: MatSnackBar,
        private router: Router
    ) {
        this.siteKey = environment.reCaptcha.siteKey;
        this.isLoading = false;
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            userName: ['Notadd', Validators.required],
            email: ['notadd@ibenchu.com', [Validators.required, Validators.email]],
            password: ['ng-notadd', Validators.required]
        });
    }

    get userName() { return this.loginForm.get('userName'); }
    get email() { return this.loginForm.get('email'); }
    get password() { return this.loginForm.get('password'); }

    onSubmit() {
        this.isLoading = true;
        this.executeReCaptcha();
    }

    executeReCaptcha() {
        this.reCaptchaV3Service.execute(this.siteKey, 'login', token => {
            this.reCaptchaToken = token;
            this.login();
        }, {
            useGlobalDomain: false
        });
    }

    login() {
        this.loginGql
            .watch({
                ...this.loginForm.value,
                token: this.reCaptchaToken
            })
            .valueChanges
            .pipe(
                map(res => res.data.login)
            )
            .subscribe(data => {
                this.openSnackBar(data.validatedUser ? '登录成功 🎉' : data.errorCodes.toString());
                this.isLoading = false;
                this.router.navigate(['/general/dashboards/analytics']);
            });
    }

    openSnackBar(message) {
        this.snackBar.open(message, 'OK 👌', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
        });
    }
}
