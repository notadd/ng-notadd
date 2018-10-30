import { NotaddNavigationItem } from '@notadd/types';

export const navigation: Array<NotaddNavigationItem> = [
    {
        id: 'general',
        title: '常规',
        type: 'group',
        children: [
            {
                id: 'dashboards',
                title: '仪表盘',
                type: 'collapse',
                icon: 'dashboard',
                children: [
                    {
                        id: 'analytics',
                        title: '分析页',
                        type: 'item',
                        url: '/modules/dashboards/analytics',
                        badge: {
                            title: '25',
                            bg: '#1189fb',
                            fg: '#FFFFFF'
                        }
                    }
                ]
            }
        ]
    }
];
