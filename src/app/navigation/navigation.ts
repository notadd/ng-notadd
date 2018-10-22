import { NotaddNavigationItem } from '@notadd/types';

export const navigation: Array<NotaddNavigationItem> = [
    {
        id: 'main',
        title: '主导航',
        type: 'group',
        children: [
            {
                id: 'dashboards',
                title: '仪表盘',
                type: 'collapse',
                icon: 'dashboard',
                children: [
                    {
                        id: 'default',
                        title: '默认页',
                        type: 'item',
                        url: '',
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
