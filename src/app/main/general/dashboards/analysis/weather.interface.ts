import { EChartOption } from 'echarts';

export interface Coords {
    longitude: number;
    latitude: number;
}

export interface RealtimeWeather {
    status: string;
    lang: string;  // 目前只支持简体中文（zh_CN、zh_SG）、繁体中文（zh_TW、zh_HK），英语（en_US、en_GB）在测试中
    server_time: 1443418222;
    tzshift: number; // 时区的偏移秒数，如东八区就是 28800 秒，使用秒是为了支持像尼泊尔这样的差 5 小时 45 分钟的地区，它们有非整齐的偏移量
    location: [
        number, // 纬度
        number // 经度
    ];
    unit: string; // 目前只支持米制（metric）和科学计量法（SI），英制还有待开发
    result: {
        status: string;
        temperature: number;  // 温度
        skycon: string;  // 天气概况
        pm25: number;       // pm25值   在新的api中增加的字段
        cloudrate: number;  // 云量
        humidity: number;  // 相对湿度
        precipitation: {  // 降水
            nearest: { // 最近的降水带 //用户补充：nearest字段有时候没有
                status: string;
                distance: number; // 距离
                intensity: number // 降水强度
            };
            local: { // 本地的降水
                status: string;
                intensity: number; // 降水强度，这是彩云自定义的一个量。如果需要mm/h，请在请求中加参数 ?unit=metric:v2
                datasource: string // 数据源
            }
        };
        wind: { // 风
            direction: number; // 风向。单位是度。正北方向为0度，顺时针增加到360度。
            speed: number // 风速，米制下是公里每小时
        }
    };
}

export interface WeatherForcast {
    status: string;
    result: {
        status: string;
        hourly: object; // 小时级预报
        minutely: object; // 分钟级预报
        daily: {
            temperature: [];
            skycon: [];
        }; // 天级别预报 最近5天的预报
    };
}

export interface WeatherReport {
    weathericon: string;
    today: {
        temperature: number;
        wind: {
            direction: number;
            speed: number;
        },
        humidity: number;
        pm25: number;
        cloudrate: number;
        precipitation: {
            nearest: {
                distance: number;
            };
            local: {
                intensity: number;
            }
        }
    };
    future: [];
    day: {
        date: number;
        xingqi: string;
    };
}

export interface SalesData {
    title: string;
    profit: number;
    amount: {
        min: number;
        max: number;
    };
    chartOption: EChartOption;
}

export interface Sales {
    prediction: SalesData;
    difference: SalesData;
}
