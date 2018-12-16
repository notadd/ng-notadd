import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EChartOption } from 'echarts';

import { Widget, WidgetsGQL } from 'app/graphql/graphql.service';
import { RealtimeWeather, Coords, WeatherForcast } from './weather.interface';

@Injectable()
export class AnalysisService {

    private widgetsExtend: any;
    private caiyunApiUrl = 'http://caiyun-api.ibenchu.net/';
    private caiyunApiKey = 'TAkhjf8d1nlSlspN';

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

    private getWidgetChartOptions(color: string, data: {date: Array<string>, amount: Array<number>}): EChartOption {
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
                        const {date, amount} = widget.chartData,
                            widgetExtend = this.widgetsExtend[widget.type];
                        const obj = Object.assign({}, widget, {
                            ...widgetExtend,
                            chartOption: this.getWidgetChartOptions(widgetExtend.chartTheme, {date, amount})
                        });
                        results.push(obj);
                    });
                    return results;
                })
            );
    }

    getRealtimeWeather(coords: Coords): Observable<RealtimeWeather> {
        return this.http.get<RealtimeWeather>(this.caiyunApiUrl + `v2/${this.caiyunApiKey}/${coords.longitude},${coords.latitude}/realtime.json`);
    }

    getWeatherForecast(coords: Coords): Observable<WeatherForcast> {
        return this.http.get<WeatherForcast>(this.caiyunApiUrl + `v2/${this.caiyunApiKey}/${coords.longitude},${coords.latitude}/forecast.json`);
    }
}
