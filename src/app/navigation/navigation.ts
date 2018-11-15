import { NotaddNavigationItem } from '@notadd/types';

export const navigation: Array<NotaddNavigationItem> = [
    {
        id: 'general',
        title: '常规',
        i18n: 'Navigation.General',
        type: 'group',
        children: [
            {
                id: 'dashboard',
                title: '仪表盘',
                i18n: 'Navigation.Dashboard',
                type: 'collapse',
                icon: 'dashboard',
                children: [
                    {
                        id: 'analytics',
                        title: '分析页',
                        i18n: 'Navigation.Analytics',
                        type: 'item',
                        url: '/general/dashboards/analytics',
                        badge: {
                            title: '25',
                            bg: '#1189fb',
                            fg: '#FFFFFF'
                        }
                    }
                ]
            },
            {
                id: 'pages',
                title: '页面',
                i18n: 'Navigation.Pages',
                type: 'collapse',
                icon: 'pages',
                children: [
                    {
                        id: 'profile',
                        title: '个人信息',
                        i18n: 'Navigation.Profile',
                        type: 'item',
                        url: '/general/pages/profile'
                    }
                ]
            }
        ]
    },
    {
        id: 'elements',
        title: 'UI 元素',
        i18n: 'Navigation.Element',
        type: 'group',
        children: [
            {
                id: 'basic-ui',
                title: '基础UI',
                i18n: 'Navigation.BasicUi',
                type: 'collapse',
                icon: 'palette',
                children: [
                    {
                        id: 'buttons',
                        title: '按钮',
                        i18n: 'Navigation.Button',
                        type: 'item',
                        url: '/elements/basic-ui/buttons'
                    },
                    {
                        id: 'cards',
                        title: '卡片',
                        i18n: 'Navigation.Card',
                        type: 'item',
                        url: '/elements/basic-ui/cards'
                    },
                    {
                        id: 'icons',
                        title: '图标',
                        i18n: 'Navigation.Icon',
                        type: 'item',
                        url: '/elements/basic-ui/icons'
                    },
                    {
                        id: 'list',
                        title: '列表',
                        i18n: 'Navigation.List',
                        type: 'item',
                        url: '/elements/basic-ui/list'
                    },
                    {
                        id: 'badges',
                        title: '徽章',
                        i18n: 'Navigation.Badge',
                        type: 'item',
                        url: '/elements/basic-ui/badges'
                    },
                    {
                        id: 'progress-bar',
                        title: '进度条',
                        i18n: 'Navigation.ProgressBar',
                        type: 'item',
                        url: '/elements/basic-ui/progress-bar'
                    },
                    {
                        id: 'button-toggle',
                        title: '开关按钮',
                        i18n: 'Navigation.ButtonToggle',
                        type: 'item',
                        url: '/elements/basic-ui/button-toggle'
                    },
                    {
                        id: 'chips',
                        title: '标签',
                        i18n: 'Navigation.Chip',
                        type: 'item',
                        url: '/elements/basic-ui/chips'
                    },
                    {
                        id: 'expansion-panel',
                        title: '可展开面板',
                        i18n: 'Navigation.ExpansionPanel',
                        type: 'item',
                        url: '/elements/basic-ui/expansion-panel'
                    },
                    {
                        id: 'tabs',
                        title: '选项卡',
                        i18n: 'Navigation.Tab',
                        type: 'item',
                        url: '/elements/basic-ui/tabs'
                    },
                    {
                        id: 'stepper',
                        title: '步进器',
                        i18n: 'Navigation.Stepper',
                        type: 'item',
                        url: '/elements/basic-ui/stepper'
                    },
                    {
                        id: 'grid-list',
                        title: '网格列表',
                        i18n: 'Navigation.GridList',
                        type: 'item',
                        url: '/elements/basic-ui/grid-list'
                    }
                ]
            }
        ]
    }
];
