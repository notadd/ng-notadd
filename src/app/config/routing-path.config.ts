export const routingPathConfig = Object.freeze({
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
        alert: 'alert',
        carousel: 'carousel',
        cascadeDropdownlist: 'cascade-dropdownlist'
    },
    angularCdk: {
        virtualList: 'virtual-list'
    },
    advancedUi: {
        fileUpload: 'file-upload'
    },

    /* services */
    services: {
        default: '',
        excelExport: 'excel-export'
    }
});
