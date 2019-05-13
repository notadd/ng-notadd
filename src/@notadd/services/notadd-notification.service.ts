import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class NotaddNotificationService {

    constructor(private matSnackbar: MatSnackBar) {
    }

    notify(message: string, action = 'OK 👌', config?: MatSnackBarConfig) {
        this.matSnackbar.open(message, action, Object.assign({}, {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
        }, config));
    }
}
