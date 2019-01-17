import { routingPathConfig } from '@config/routing-path.config';
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
                        url: [
                            routingPathConfig.app.general,
                            routingPathConfig.general.dashboards,
                            routingPathConfig.dashboards.analytics
                        ],
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
                        url: [
                            routingPathConfig.app.general,
                            routingPathConfig.general.pages,
                            routingPathConfig.pages.profile
                        ]
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
                                url: [
                                    routingPathConfig.app.general,
                                    routingPathConfig.general.pages,
                                    routingPathConfig.pages.errors,
                                ],
                                urlParam: {
                                    code: 400
                                }
                            },
                            {
                                id: 'errors_403',
                                title: '403',
                                i18n: 'Navigation.Errors_403',
                                type: 'item',
                                url: [
                                    routingPathConfig.app.general,
                                    routingPathConfig.general.pages,
                                    routingPathConfig.pages.errors,
                                ],
                                urlParam: {
                                    code: 403
                                }
                            },
                            {
                                id: 'errors_404',
                                title: '404',
                                i18n: 'Navigation.Errors_404',
                                type: 'item',
                                url: [
                                    routingPathConfig.app.general,
                                    routingPathConfig.general.pages,
                                    routingPathConfig.pages.errors,
                                ],
                                urlParam: {
                                    code: 404
                                }
                            },
                            {
                                id: 'errors_500',
                                title: '500',
                                i18n: 'Navigation.Errors_500',
                                type: 'item',
                                url: [
                                    routingPathConfig.app.general,
                                    routingPathConfig.general.pages,
                                    routingPathConfig.pages.errors,
                                ],
                                urlParam: {
                                    code: 500
                                }
                            },
                            {
                                id: 'errors_503',
                                title: '503',
                                i18n: 'Navigation.Errors_503',
                                type: 'item',
                                url: [
                                    routingPathConfig.app.general,
                                    routingPathConfig.general.pages,
                                    routingPathConfig.pages.errors
                                ],
                                urlParam: {
                                    code: 503
                                }
                            }
                        ]
                    },
                    {
                        id: 'login',
                        title: '登录',
                        i18n: 'Navigation.Login',
                        type: 'item',
                        url: [
                            routingPathConfig.app.general,
                            routingPathConfig.general.pages,
                            routingPathConfig.pages.login
                        ]
                    },
                    {
                        id: 'register',
                        title: '注册',
                        i18n: 'Navigation.Register',
                        type: 'item',
                        url: [
                            routingPathConfig.app.general,
                            routingPathConfig.general.pages,
                            routingPathConfig.pages.register
                        ]
                    },
                    {
                        id: 'login-v2',
                        title: '登录 V2',
                        i18n: 'Navigation.Login_v2',
                        type: 'item',
                        url: [
                            routingPathConfig.app.general,
                            routingPathConfig.general.pages,
                            routingPathConfig.pages.loginV2
                        ]
                    },
                    {
                        id: 'register-v2',
                        title: '注册 V2',
                        i18n: 'Navigation.Register_v2',
                        type: 'item',
                        url: [
                            routingPathConfig.app.general,
                            routingPathConfig.general.pages,
                            routingPathConfig.pages.registerV2
                        ]
                    },
                    {
                        id: 'forgot-password',
                        title: '忘记密码',
                        i18n: 'Navigation.ForgotPassword',
                        type: 'item',
                        url: [
                            routingPathConfig.app.general,
                            routingPathConfig.general.pages,
                            routingPathConfig.pages.forgotPassword
                        ]
                    },
                    {
                        id: 'lockscreen',
                        title: '锁定屏幕',
                        i18n: 'Navigation.Lockscreen',
                        type: 'item',
                        url: [
                            routingPathConfig.app.general,
                            routingPathConfig.general.pages,
                            routingPathConfig.pages.lockscreen
                        ]
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
                title: '基础 UI',
                i18n: 'Navigation.BasicUi',
                type: 'collapse',
                icon: 'palette',
                children: [
                    {
                        id: 'buttons',
                        title: '按钮',
                        i18n: 'Navigation.Button',
                        type: 'item',
                        url: [
                            routingPathConfig.app.elements,
                            routingPathConfig.elements.basicUi,
                            routingPathConfig.basicUi.buttons
                        ]
                    },
                    {
                        id: 'cards',
                        title: '卡片',
                        i18n: 'Navigation.Card',
                        type: 'item',
                        url: [
                            routingPathConfig.app.elements,
                            routingPathConfig.elements.basicUi,
                            routingPathConfig.basicUi.cards
                        ]
                    },
                    {
                        id: 'icons',
                        title: '图标',
                        i18n: 'Navigation.Icon',
                        type: 'item',
                        url: [
                            routingPathConfig.app.elements,
                            routingPathConfig.elements.basicUi,
                            routingPathConfig.basicUi.icons
                        ]
                    },
                    {
                        id: 'list',
                        title: '列表',
                        i18n: 'Navigation.List',
                        type: 'item',
                        url: [
                            routingPathConfig.app.elements,
                            routingPathConfig.elements.basicUi,
                            routingPathConfig.basicUi.list
                        ]
                    },
                    {
                        id: 'badges',
                        title: '徽章',
                        i18n: 'Navigation.Badge',
                        type: 'item',
                        url: [
                            routingPathConfig.app.elements,
                            routingPathConfig.elements.basicUi,
                            routingPathConfig.basicUi.badges
                        ]
                    },
                    {
                        id: 'progress-bar',
                        title: '进度条',
                        i18n: 'Navigation.ProgressBar',
                        type: 'item',
                        url: [
                            routingPathConfig.app.elements,
                            routingPathConfig.elements.basicUi,
                            routingPathConfig.basicUi.progressBar
                        ]
                    },
                    {
                        id: 'button-toggle',
                        title: '开关按钮',
                        i18n: 'Navigation.ButtonToggle',
                        type: 'item',
                        url: [
                            routingPathConfig.app.elements,
                            routingPathConfig.elements.basicUi,
                            routingPathConfig.basicUi.buttonToggle
                        ]
                    },
                    {
                        id: 'chips',
                        title: '标签',
                        i18n: 'Navigation.Chip',
                        type: 'item',
                        url: [
                            routingPathConfig.app.elements,
                            routingPathConfig.elements.basicUi,
                            routingPathConfig.basicUi.chips
                        ]
                    },
                    {
                        id: 'expansion-panel',
                        title: '可展开面板',
                        i18n: 'Navigation.ExpansionPanel',
                        type: 'item',
                        url: [
                            routingPathConfig.app.elements,
                            routingPathConfig.elements.basicUi,
                            routingPathConfig.basicUi.expansionPanel
                        ]
                    },
                    {
                        id: 'tabs',
                        title: '选项卡',
                        i18n: 'Navigation.Tab',
                        type: 'item',
                        url: [
                            routingPathConfig.app.elements,
                            routingPathConfig.elements.basicUi,
                            routingPathConfig.basicUi.tabs
                        ]
                    },
                    {
                        id: 'stepper',
                        title: '步进器',
                        i18n: 'Navigation.Stepper',
                        type: 'item',
                        url: [
                            routingPathConfig.app.elements,
                            routingPathConfig.elements.basicUi,
                            routingPathConfig.basicUi.stepper
                        ]
                    },
                    {
                        id: 'grid-list',
                        title: '网格列表',
                        i18n: 'Navigation.GridList',
                        type: 'item',
                        url: [
                            routingPathConfig.app.elements,
                            routingPathConfig.elements.basicUi,
                            routingPathConfig.basicUi.gridList
                        ]
                    }
                ]
            },
            {
                id: 'ng-material',
                title: '拓展组件',
                i18n: 'Navigation.NgMaterial2',
                type: 'collapse',
                icon: 'extension',
                children: [
                    {
                        id: 'alert',
                        title: '提示框',
                        i18n: 'Navigation.Alert',
                        type: 'item',
                        url: [
                            routingPathConfig.app.elements,
                            routingPathConfig.elements.ngMaterial2,
                            routingPathConfig.ngMaterial2.alert
                        ]
                    },
                    {
                        id: 'carousel',
                        title: '轮播图',
                        i18n: 'Navigation.Carousel',
                        type: 'item',
                        url: [
                            routingPathConfig.app.elements,
                            routingPathConfig.elements.ngMaterial2,
                            routingPathConfig.ngMaterial2.carousel
                        ]
                    },
                    {
                        id: 'cascade-dropdownlist',
                        title: '多级联动',
                        i18n: 'Navigation.CascadeDropdownlist',
                        type: 'item',
                        url: [
                            routingPathConfig.app.elements,
                            routingPathConfig.elements.ngMaterial2,
                            routingPathConfig.ngMaterial2.cascadeDropdownlist
                        ]
                    }
                ]
            },
            {
                id: 'angular-cdk',
                title: 'Angular CDK',
                i18n: 'Navigation.AngularCdk',
                type: 'collapse',
                icon: 'font_download',
                children: [
                    {
                        id: 'virtual-list',
                        title: '虚拟列表',
                        i18n: 'Navigation.VirtualList',
                        type: 'item',
                        url: [
                            routingPathConfig.app.elements,
                            routingPathConfig.elements.angularCdk,
                            routingPathConfig.angularCdk.virtualList
                        ]
                    }
                ]
            },
            {
                id: 'data-table',
                title: '数据表',
                i18n: 'Navigation.DataTable',
                type: 'item',
                icon: 'grid_on',
                url: [
                    routingPathConfig.app.elements,
                    routingPathConfig.elements.dataTable
                ]
            },
            {
                id: 'advanced-ui',
                title: '高级组件',
                i18n: 'Navigation.AdvancedUi',
                type: 'collapse',
                icon: 'tune',
                children: [
                    {
                        id: 'file-upload',
                        title: '文件上传',
                        i18n: 'Navigation.FileUpload',
                        type: 'item',
                        url: [
                            routingPathConfig.app.elements,
                            routingPathConfig.elements.advancedUi,
                            routingPathConfig.advancedUi.fileUpload
                        ]
                    },
                    {
                        id: 'json-schema-form',
                        title: 'json schema form',
                        i18n: 'Navigation.JsonSchemaForm',
                        type: 'item',
                        url: [
                            routingPathConfig.app.elements,
                            routingPathConfig.elements.advancedUi,
                            routingPathConfig.advancedUi.jsonSchemaForm
                        ]
                    }
                ]
            }
        ]
    }/*,
    {
        id: 'applications',
        title: '应用',
        i18n: 'Navigation.Applications',
        type: 'group',
        children: [
            {
                id: 'roles-permissions',
                title: '角色 & 权限',
                i18n: 'Navigation.RolesPermissions',
                type: 'collapse',
                icon: 'lock',
                children: [
                    {
                        id: 'role',
                        title: '角色',
                        i18n: 'Navigation.Role',
                        type: 'item',
                        url: '/applications/roles-permissions/roles'
                    },
                    {
                        id: 'permission',
                        title: '权限',
                        i18n: 'Navigation.Permission',
                        type: 'item',
                        url: '/applications/roles-permissions/permissions'
                    }
                ]
            },
            {
                id: 'users',
                title: '用户',
                i18n: 'Navigation.Users',
                type: 'collapse',
                icon: 'people',
                children: [
                    {
                        id: 'user-group',
                        title: '用户',
                        i18n: 'Navigation.UserGroup',
                        type: 'item',
                        url: '/applications/users/user-group'
                    },
                    {
                        id: 'user',
                        title: '用户组',
                        i18n: 'Navigation.User',
                        type: 'item',
                        url: '/applications/users/user'
                    }
                ]
            }
        ]
    }*/,
    {
        id: 'services',
        title: 'SERVICES',
        i18n: 'Navigation.Services',
        type: 'group',
        children: [
            {
                id: 'excel-export',
                title: 'Excel 导出',
                i18n: 'Navigation.ExcelExport',
                type: 'item',
                icon: 'unarchive',
                url: [
                    routingPathConfig.app.services,
                    routingPathConfig.services.excelExport
                ]
            }
        ]
    }
];
