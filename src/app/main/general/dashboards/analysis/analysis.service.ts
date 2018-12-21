import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EChartOption } from 'echarts';
import * as echarts from 'echarts';

import { Widget, WidgetsGQL } from 'app/graphql/graphql.service';
import { RealtimeWeather, Coords, WeatherForcast, Sales } from './weather.interface';
import { environment } from 'environments/environment';

@Injectable()
export class AnalysisService {

    private widgetsExtend: any;
    private caiyunApiUrl = environment.caiyunApi.url;
    private caiyunApiKey = environment.caiyunApi.key;
    private weatherReport = {
        weathericon: 'wi-day-cloudy',
        today: {
            temperature: 0,
            wind: {
                direction: 0,
                speed: 0
            },
            humidity: 0,
            pm25: 0,
            cloudrate: 0,
            precipitation: {
                local: {
                    intensity: 0
                }
            }
        },
        future: [],
        day: {
            date: Date.now(),
            xingqi: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()],
        }
    };

    constructor(
        private widgets: WidgetsGQL,
        private http: HttpClient
    ) {
        this.widgetsExtend = {
            user: {
                title: '用户',
                titleIcon: 'person',
                chartTheme: '#7986cb'
            },
            clicks: {
                title: '点击量',
                titleIcon: 'flash_on',
                chartTheme: '#ffd54f'
            },
            views: {
                title: '浏览量',
                titleIcon: 'equalizer',
                chartTheme: '#4dd0e1'
            },
            follows: {
                title: '关注度',
                titleIcon: 'storage',
                chartTheme: '#81c784'
            }
        };
    }

    private getWidgetChartOptions(color: string, data: { date: Array<string>, amount: Array<number> }): EChartOption {
        return {
            grid: {
                top: '8%',
                left: '1%',
                right: '1%',
                bottom: '8%',
                containLabel: true,
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLine: { // 坐标轴轴线相关设置。数学上的x轴
                    show: false
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    show: false
                },
                data: data.date,
            }],
            yAxis: [{
                type: 'value',
                min: 0,
                max: 50,
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    show: false
                },
                axisTick: {
                    show: false,
                }
            }],
            series: [{
                type: 'line',
                smooth: true, // 是否平滑曲线显示
                symbolSize: 0,
                lineStyle: {
                    width: 0
                },
                areaStyle: { // 区域填充样式
                    normal: {
                        // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                        /*color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            {
                                offset: 0,
                                color: '#7986cb'
                            },
                            {
                                offset: 0.8,
                                color: '#7986cb'
                            }
                        ], false),*/
                        color,
                        shadowColor: 'rgba(53,142,215, 0.9)', // 阴影颜色
                        shadowBlur: 0 // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                    }
                },
                data: data.amount
            }]
        };
    }

    getWidgets(): Observable<Array<any>> {
        return this.widgets
            .watch()
            .valueChanges
            .pipe(
                map(result => result.data.widgets),
                map(widgets => {
                    const results = [];
                    widgets.map(widget => {
                        const { date, amount } = widget.chartData,
                            widgetExtend = this.widgetsExtend[widget.type];
                        const obj = Object.assign({}, widget, {
                            ...widgetExtend,
                            chartOption: this.getWidgetChartOptions(widgetExtend.chartTheme, { date, amount })
                        });
                        results.push(obj);
                    });
                    return results;
                })
            );
    }

    private getRealtimeWeather(coords: Coords): Observable<RealtimeWeather> {
        return this.http.get<RealtimeWeather>(this.caiyunApiUrl + `v2/${this.caiyunApiKey}/${coords.longitude},${coords.latitude}/realtime.json`);
    }

    private getWeatherForecast(coords: Coords): Observable<WeatherForcast> {
        return this.http.get<WeatherForcast>(this.caiyunApiUrl + `v2/${this.caiyunApiKey}/${coords.longitude},${coords.latitude}/forecast.json`);
    }

    getWeatherReportData(): any {
        if (!navigator.geolocation) {
            // 当前浏览器不支持 geolocation时 默认为北京
            const coords: Coords = { latitude: 39.90923, longitude: 116.397428 };
            this.updateWeather(coords);
        } else {
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                this.updateWeather(coords);
            }, err => {
                // 获取不到位置信息时 默认为北京
                const coords: Coords = { latitude: 39.90923, longitude: 116.397428 };
                this.updateWeather(coords);
            });
        }
        return this.weatherReport;
    }

    private updateWeather(coords: Coords) {
        // 实时天气
        this.getRealtimeWeather(coords)
            .subscribe(data => {
                if (data.result.status === 'ok') {
                    this.weatherReport.today = data.result;
                    this.weatherReport.weathericon = this.weatherIcon(data.result.skycon);
                }
            });

        // 天气预报，5日内天气
        this.getWeatherForecast(coords)
            .subscribe(data => {
                if (data.status === 'ok') {
                    this.weatherReport.future = data.result.daily.temperature;
                    data.result.daily.skycon.forEach((obj: any, index: number) => {
                        this.weatherReport.future[index].weathericon = this.weatherIcon(obj.value);
                    });
                }
            });
    }

    private weatherIcon(skycon) {
        return {
            CLEAR_DAY: 'wi-day-sunny',
            CLEAR_NIGHT: 'wi-night-clear',
            PARTLY_CLOUDY_DAY: 'wi-day-cloudy',
            PARTLY_CLOUDY_NIGHT: 'wi-night-alt-cloudy',
            CLOUDY: 'wi-day-cloudy-high',
            RAIN: 'wi-day-rain',
            SNOW: 'wi-day-snow',
            WIND: 'wi-day-windy',
            HAZE: 'wi-day-haze'
        }[skycon];
    }

    getScatterMapOption(): Observable<EChartOption> {
        return this.http.get('assets/data/world.json')
            .pipe(
                map(worldJson => {
                    // register map:
                    echarts.registerMap('world', worldJson);
                }),
                map(_ => {
                    // scatter map options:
                    const scatterMapOption = {
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
                    return scatterMapOption;
                })
            );
    }

    getTrendBarOption(): EChartOption {
        const trendBarOption = {
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
            tooltip: {},
            grid: {
                top: '30%',
                left: '3%',
                right: '4%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: { show: false },
                    axisLine: { show: false },
                    axisLabel: {
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 'bold'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
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
            series: [
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
        return trendBarOption;
    }

    getSalesOption(): Sales {
        const salesOption = {
            prediction: {
                title: 'Sales Prediction',
                profit: 3528,
                amount: {
                    min: 150,
                    max: 165
                },
                chartOption: {
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
                                color: [[0.5, '#049efb'], [1, '#9098ac']],
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
                        detail: {
                            show: false
                        },
                        data: [{ value: 50, name: 'Sales Prediction', color: '#049efb' }]
                    }]
                }
            },
            difference: {
                title: 'Sales Difference',
                profit: 4316,
                amount: {
                    min: 150,
                    max: 165
                },
                chartOption: {
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
                                color: [[0.3, '#f44337'], [1, '#9098ac']],
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
                        detail: {
                            show: false
                        },
                        data: [{ value: 30, name: 'Sales Difference', color: '#049efb' }]
                    }]
                }
            }
        };
        return salesOption;
    }
}
