export const routingPathConfig = {
    /* application */
    app: {
        default: '',
        general: 'general',
        elements: 'elements',
        applications: 'applications',
        services: 'services',
        wildcard: '**'
    },

    /* general */
    general: {
        default: '',
        dashboards: 'dashboards',
        pages: 'pages'
    },
    dashboards: {
        default: '',
        analytics: 'analytics'
    },
    pages: {
        default: '',
        profile: 'profile',
        errors: 'errors/:code',
        login: 'login',
        loginV2: 'login-v2',
        register: 'register',
        registerV2: 'register-v2',
        forgotPassword: 'forgot-password',
        lockscreen: 'lockscreen'
    },

    /* elements */
    elements: {
        default: '',
        basicUi: 'basic-ui',
        ngMaterial2: 'ng-material2',
        angularCdk: 'angular-cdk',
        dataTable: 'data-table',
        advancedUi: 'advanced-ui'
    },
    basicUi: {
        default: '',
        buttons: 'buttons',
        cards: 'cards',
        icons: 'icons',
        list: 'list',
        badges: 'badges',
        progressBar: 'progress-bar',
        buttonToggle: 'button-toggle',
        chips: 'chips',
        expansionPanel: 'expansion-panel',
        tabs: 'tabs',
        stepper: 'stepper',
        gridList: 'grid-list'
    },
    ngMaterial2: {
        default: '',
        alert: 'alert',
        carousel: 'carousel',
        cascadeDropdownlist: 'cascade-dropdownlist'
    },
    angularCdk: {
        default: '',
        virtualList: 'virtual-list'
    },
    dataTable: {
        default: ''
    },
    advancedUi: {
        default: '',
        fileUpload: 'file-upload',
        jsonSchemaForm: 'json-schema-form'
    },

    /* services */
    services: {
        default: '',
        excelExport: 'excel-export'
    },

    /* applications */
    applications: {
        default: '',
        rolesPermissions: 'roles-permissions',
        users: 'users'
    },
    rolesPermissions: {
        default: '',
        roles: 'roles',
        role: 'roles/:id',
        permission: 'permission',
    },
    users: {
        default: '',
        user: 'user',
        userGroup: 'user-group'
    }
};
