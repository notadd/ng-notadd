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
                        url: '/general/dashboards/analytics',
                        badge: {
                            title: '25',
                            bg: '#1189fb',
                            fg: '#FFFFFF'
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 'elements',
        title: 'UI 元素',
        type: 'group',
        children: [
            {
                id: 'basic-ui',
                title: '基础UI',
                type: 'collapse',
                icon: 'palette',
                children: [
                    {
                        id: 'buttons',
                        title: '按钮',
                        type: 'item',
                        url: '/elements/basic-ui/buttons'
                    }
                ]
            }
        ]
    }
];
