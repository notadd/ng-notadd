import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgForage } from 'ngforage';

import { AnalysisService } from './analysis.service';
import { EChartOption } from 'echarts';
import * as echarts from 'echarts';
import { Coords } from './weather.interface';

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
    salesOption = {
        prediction: {},
        difference: {}
    };

    weatherReport = {
        weathericon: 'wi-day-cloudy',
        today: {},
        future: [],
        day: {
            date: Date.now(),
            xingqi: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()],
        }
    };

    constructor(
        private service: AnalysisService,
        private ngForage: NgForage,
        private http: HttpClient
    ) {
    }

    ngOnInit() {
        this.service.getWidgets()
            .subscribe(widgets => {
                this.widgets = widgets;
            });

        this.ngForage.setItem('TOKEN_DATA', 'token-demo');

        // scatter map option
        this.http.get('assets/data/world.json')
            .subscribe(worldJson => {
                // register map:
                echarts.registerMap('world', worldJson);
                // update options:
                this.scatterMapOption = {
                    geo: {
                        map: 'world',
                        itemStyle: {					// 定义样式
                            normal: {					// 普通状态下的样式
                                areaColor: '#c5cae9',
                                borderColor: '#fff'
                            },
                            emphasis: {					// 高亮状态下的样式
                                areaColor: '#b3bbef'
                            }
                        },
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        roam: true, // 开启鼠标缩放和平移漫游
                        zoom: 1,
                        scaleLimit: {
                            min: 2,
                            max: 13
                        },
                        center: [21.148055, 27.939372]
                    },
                    backgroundColor: '#fff',
                    tooltip: {
                        trigger: 'item',
                        formatter: (params: any) => {
                            return params.name + ' : ' + params.value[2] + ' ' + params.seriesName;
                        }
                    },
                    visualMap: [{
                        show: false,
                        min: 0,
                        max: 2500,
                        left: 'left',
                        top: 'bottom',
                        text: ['高', '低'],   // 文本，默认为数值文本
                        calculable: true
                    }],
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: '0',
                        top: 'center',
                        feature: {
                            mark: { show: true },
                            dataView: {
                                show: true,
                                readOnly: false,
                                emphasis: {
                                    iconStyle: {
                                        textPosition: 'right',
                                        textAlign: 'left'
                                    }
                                }
                            },
                            restore: {
                                show: true,
                                emphasis: {
                                    iconStyle: {
                                        textPosition: 'right',
                                        textAlign: 'left'
                                    }
                                }
                            },
                            saveAsImage: {
                                show: true,
                                emphasis: {
                                    iconStyle: {
                                        textPosition: 'right',
                                        textAlign: 'left'
                                    }
                                }
                            }
                        }
                    },
                    series: [
                        {
                            name: 'Visits', // series名称
                            type: 'scatter', // series图标类型
                            coordinateSystem: 'geo', // series坐标系类型
                            data: [
                                {
                                    name: 'China', // 数据项名称，在这里指地区名称
                                    value: [       // 数据项值
                                        116.46,    // 地理坐标，经度
                                        39.92,     // 地理坐标，纬度
                                        340        // 北京地区的数值
                                    ]
                                },
                                {
                                    name: 'Russia',
                                    value: [
                                        103.41, 66.42,
                                        1500
                                    ]
                                },
                                {
                                    name: 'US',
                                    value: [
                                        -74.13, 42.37,
                                        3000
                                    ]
                                }
                            ]
                        }
                    ]
                };
            });

        // visits trend bar option
        this.trendBarOption = {
            title: {
                text: 'Visits Trend',
                left: '3%',
                top: '20px',
                textStyle: {
                    color: '#fff',
                    fontSize: 20,
                    marginBottom: '20px'
                }
            },
            color: ['#fff'],
            backgroundColor: '#1d88e5',
            tooltip : {},
            grid: {
                top: '30%',
                left: '3%',
                right: '4%',
                bottom: '15%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: { show: false },
                    axisLine: { show: false },
                    axisLabel: {
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 'bold'
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    splitLine: { show: false },
                    axisTick: { show: false },
                    axisLine: { show: false },
                    axisLabel: {
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 'bold'
                    }
                }
            ],
            series : [
                { // For shadow
                    type: 'bar',
                    silent: true,
                    itemStyle: {
                        normal: {
                            color: '#57a8ef'
                        }
                    },
                    barGap: '-100%',
                    barCategoryGap: '60%',
                    data: [500, 500, 500, 500, 500, 500, 500],
                    animation: false
                },
                {
                    name: 'Visits',
                    type: 'bar',
                    z: 3,
                    label: {
                        normal: {
                            position: 'top',
                            show: true
                        }
                    },
                    barWidth: '20%',
                    data: [74, 52, 200, 334, 390, 330, 220]
                }
            ]
        };

        if (!navigator.geolocation) {
            console.log('当前浏览器不支持 geolocation.');
        } else {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                this.updateWeather(coords);
                this.updateWeatherFuture(coords);
            }, err => {
                // 获取不到位置信息时 默认为北京
                const coords: Coords = { latitude: 39.90923, longitude: 116.397428 };
                this.updateWeather(coords);
                this.updateWeatherFuture(coords);
            });
        }

        // sales
        this.salesOption.prediction = {
            series: [{
                name: 'Sales Prediction',
                type: 'gauge',
                radius: '100%',
                startAngle: 180,
                endAngle: 0,
                min: 0,
                max: 100,
                grid: {
                    bottom: '-45%'
                },
                axisLine: { // 坐标轴线
                    lineStyle: {
                        color: [[ 0.5, '#049efb'], [ 1, '#9098ac']],
                        width: 15
                    }
                },
                axisLabel: { // 坐标轴小标记
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                title: { show: false },
                detail : {
                    show: false
                },
                data: [{value: 50, name: 'Sales Prediction', color: '#049efb'}]
            }]
        };

        this.salesOption.difference = {
            series: [{
                name: 'Sales Difference',
                type: 'gauge',
                radius: '100%',
                startAngle: 180,
                endAngle: 0,
                min: 0,
                max: 100,
                axisLine: { // 坐标轴线
                    lineStyle: {
                        color: [[ 0.3, '#f44337'], [ 1, '#9098ac']],
                        width: 15
                    }
                },
                axisLabel: { // 坐标轴小标记
                    show: false
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                title: { show: false },
                detail : {
                    show: false
                },
                data: [{value: 30, name: 'Sales Difference', color: '#049efb'}]
            }]
        };

    }

    updateWeather(coords: Coords) {
        this.service.getRealtimeWeather(coords)
        .subscribe(data => {
            console.log(data);
            if (data.result.status === 'ok') {
                this.weatherReport.today = data.result;
                this.weatherReport.weathericon = this.weatherIcon(data.result.skycon);
            }
        });
    }

    updateWeatherFuture(coords: Coords) {
        this.service.getWeatherForecast(coords)
        .subscribe(data => {
            if (data.status === 'ok') {
                this.weatherReport.future = data.result.daily.temperature;
                console.log(data.result.daily);
                data.result.daily.skycon.forEach((obj: any, index: number) => {
                    this.weatherReport.future[index].weathericon = this.weatherIcon(obj.value);
                });
            }
        });
    }

    weatherIcon(skycon) {
        return {
            CLEAR_DAY: 'wi-day-sunny',
            CLOUD: 'wi-day-cloudy',
            RAIN: 'wi-day-rain',
            WINDAY: 'wi-day-windy',
            SNOW: 'wi-day-snow',
            PARTLY_CLOUDY_DAY: 'wi-day-cloudy',
            CLEAR_NIGHT: 'wi-night-clear'
        }[skycon];
    }

}
