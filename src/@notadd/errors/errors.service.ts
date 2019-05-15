import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { of, BehaviorSubject } from 'rxjs';
import * as StackTraceParser from 'error-stack-parser';

@Injectable()
export class NotaddErrorsService {

    constructor(
        private router: Router,
        private locationStrategy: LocationStrategy
    ) {
    }

    log(error) {
        // Log the error to the console
        console.error(error);
        // Send error to server
        const errorInfo = this.addContextInfo(error);
        return of(errorInfo);
    }

    addContextInfo(error) {
        const name = error.name || void (0);
        const appId = 'notadd';
        const user = 'TianHun';
        const time = new Date().getTime();
        const id = `${appId}-${user}-${time}`;
        const location = this.locationStrategy;
        const url = location instanceof PathLocationStrategy ? location.path() : '';
        const status = error.status || void (0);
        const message = error.message || error.toString();
        const stack = error instanceof HttpErrorResponse ? void (0) : StackTraceParser.parse(error);

        return { name, appId, user, time, id, url, status, message, stack };
    }
}
