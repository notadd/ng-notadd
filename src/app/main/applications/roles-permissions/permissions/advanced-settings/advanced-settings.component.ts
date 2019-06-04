import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'advanced-settings',
    templateUrl: './advanced-settings.component.html',
    styleUrls: ['./advanced-settings.component.scss']
})
export class AdvancedSettingsComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<AdvancedSettingsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit() {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
