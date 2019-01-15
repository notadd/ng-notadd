import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ReCaptchaV3Service } from 'ngx-captcha';

import { environment } from '@env';
import { LoginGQL } from '@graphql/graphql.service';
import { RoutingPathPipe } from '@notadd/pipes/routing-path.pipe';
import { routingPathConfig } from '@config/routing-path.config';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [ RoutingPathPipe ]
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
        private router: Router,
        private path: RoutingPathPipe
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
                this.router.navigate([
                    this.path.transform([
                        routingPathConfig.app.general,
                        routingPathConfig.general.dashboards,
                        routingPathConfig.dashboards.analytics
                    ])
                ]);
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
