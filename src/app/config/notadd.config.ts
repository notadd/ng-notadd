import { NotaddConfig } from '@notadd/types';

export const notaddConfig: NotaddConfig = {
    layout: {
        style: 'vertical-layout',
        width: 'fullwidth',
        navbar: {
            background: 'mat-notadd-dark-500-bg',
            secondaryBackground: 'mat-blue-600-bg',
            collapsed: false,
            hidden: false,
            position: 'start'
        },
        toolbar: {
            background: 'mat-blue-600-bg',
            hidden: false,
            position: 'below-fixed'
        },
        footer: {
            background: 'mat-notadd-dark-A700-bg',
            hidden: false,
            position: 'above'
        },
        sidepanel: {
            hidden: false,
            position: 'right'
        }
    },
    customScrollbars: true
};
