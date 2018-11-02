import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'expansion-panel',
    templateUrl: './expansion-panel.component.html',
    styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent implements OnInit {

    panelOpenState = false;
    step = 0;

    constructor() {
    }

    ngOnInit() {
    }

    setStep(index: number) {
        this.step = index;
    }

    nextStep() {
        this.step++;
    }

    prevStep() {
        this.step--;
    }

}
