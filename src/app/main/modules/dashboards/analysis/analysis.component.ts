import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';

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
        private service: AnalysisService
    ) {
    }

    ngOnInit() {
        this.service.getWidgets()
            .subscribe(widgets => {
                this.widgets = widgets;
            });
    }

}
