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
                    },
                    {
                        id: 'cards',
                        title: '卡片',
                        type: 'item',
                        url: '/elements/basic-ui/cards'
                    },
                    {
                        id: 'icons',
                        title: '图标',
                        type: 'item',
                        url: '/elements/basic-ui/icons'
                    },
                    {
                        id: 'list',
                        title: '列表',
                        type: 'item',
                        url: '/elements/basic-ui/list'
                    },
                    {
                        id: 'badges',
                        title: '徽章',
                        type: 'item',
                        url: '/elements/basic-ui/badges'
                    },
                    {
                        id: 'progress-bar',
                        title: '进度条',
                        type: 'item',
                        url: '/elements/basic-ui/progress-bar'
                    },
                    {
                        id: 'button-toggle',
                        title: '开关按钮',
                        type: 'item',
                        url: '/elements/basic-ui/button-toggle'
                    },
                    {
                        id: 'chips',
                        title: '标签',
                        type: 'item',
                        url: '/elements/basic-ui/chips'
                    },
                    {
                        id: 'expansion-panel',
                        title: '可展开面板',
                        type: 'item',
                        url: '/elements/basic-ui/expansion-panel'
                    },
                    {
                        id: 'tabs',
                        title: '选项卡',
                        type: 'item',
                        url: '/elements/basic-ui/tabs'
                    }
                ]
            }
        ]
    }
];
