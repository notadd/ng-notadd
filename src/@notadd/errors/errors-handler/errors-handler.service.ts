import { Injectable, ErrorHandler, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { NotaddNotificationService } from '@notadd/services/notadd-notification.service';
import { NotaddErrorsService } from '../errors.service';

@Injectable()
export class NotaddErrorsHandler implements ErrorHandler {

    constructor(
        // Because the ErrorHandler is created before the providers, we’ll have to use the Injector to get them.
        private injector: Injector,
        private ngZone: NgZone
    ) {}

    handleError(error: Error | HttpErrorResponse): void {
        const notificationService = this.injector.get(NotaddNotificationService);
        const errorsService = this.injector.get(NotaddErrorsService);
        const router = this.injector.get(Router);

        if (error instanceof HttpErrorResponse) {
            // No Internet connection
            if (!navigator.onLine) {
                return notificationService.notify('No Internet Connection');
            }

            // Http Error
            // Send the error to the server
            errorsService.log(error).subscribe();
            return notificationService.notify(`${error.status} - ${error.message}`);
        } else {
            errorsService
                .log(error)
                .subscribe(errorWithContextInfo => {
                    this.ngZone.run(() => router.navigate(['/error', errorWithContextInfo.name], { queryParams: errorWithContextInfo }));
                });
        }
    }
}
