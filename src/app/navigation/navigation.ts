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
                        title: '个人主页',
                        i18n: 'Navigation.Profile',
                        type: 'item',
                        url: '/general/pages/profile'
                    },
                    {
                        id: 'errors',
                        title: '错误页',
                        i18n: 'Navigation.Errors',
                        type: 'collapse',
                        children: [
                            {
                                id: 'errors_400',
                                title: '400',
                                i18n: 'Navigation.Errors_400',
                                type: 'item',
                                url: '/general/pages/errors/400'
                            },
                            {
                                id: 'errors_403',
                                title: '403',
                                i18n: 'Navigation.Errors_403',
                                type: 'item',
                                url: '/general/pages/errors/403'
                            },
                            {
                                id: 'errors_404',
                                title: '404',
                                i18n: 'Navigation.Errors_404',
                                type: 'item',
                                url: '/general/pages/errors/404'
                            },
                            {
                                id: 'errors_500',
                                title: '500',
                                i18n: 'Navigation.Errors_500',
                                type: 'item',
                                url: '/general/pages/errors/500'
                            },
                            {
                                id: 'errors_503',
                                title: '503',
                                i18n: 'Navigation.Errors_503',
                                type: 'item',
                                url: '/general/pages/errors/503'
                            }
                        ]
                    },
                    {
                        id: 'login',
                        title: '登录',
                        i18n: 'Navigation.Login',
                        type: 'item',
                        url: '/general/pages/login'
                    },
                    {
                        id: 'login_v2',
                        title: '登录 V2',
                        i18n: 'Navigation.Login_v2',
                        type: 'item',
                        url: '/general/pages/login_v2'
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
