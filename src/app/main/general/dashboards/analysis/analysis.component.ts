import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForage } from 'ngforage';

import { AnalysisService } from './analysis.service';
import { EChartOption } from 'echarts';
import { Sales, WeatherReport } from './weather.interface';

@Component({
    selector: 'analysis',
    templateUrl: './analysis.component.html',
    styleUrls: ['./analysis.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AnalysisComponent implements OnInit {

    widgets: Array<any>;
    scatterMapOption: EChartOption;
    trendBarOption: EChartOption;
    salesOption: Sales;
    weatherReport: WeatherReport;

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

        // scatter map option
        this.service.getScatterMapOption().subscribe((option) => {
            this.scatterMapOption = option;
        });

        // visits trend bar option
        this.trendBarOption = this.service.getTrendBarOption();

        // weather report data
        this.weatherReport = this.service.getWeatherReportData();

        // sales option
        this.salesOption = this.service.getSalesOption();

    }

}
