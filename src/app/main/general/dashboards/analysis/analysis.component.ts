import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForage } from 'ngforage';

import { AnalysisService } from './analysis.service';

@Component({
    selector: 'analysis',
    templateUrl: './analysis.component.html',
    styleUrls: ['./analysis.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AnalysisComponent implements OnInit {

    widgets: Array<any>;

    constructor(
        private service: AnalysisService,
        private ngForage: NgForage
    ) {
    }

    ngOnInit() {
        this.service.getWidgets()
            .subscribe(widgets => {
                this.widgets = widgets;
            });

        this.ngForage.setItem('TOKEN_DATA', 'token-demo');
    }

}
