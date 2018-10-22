import { NotaddConfig } from '@notadd/types';

export const notaddConfig: NotaddConfig = {
    layout: {
        style: 'vertical-layout',
        width: 'fullwidth',
        navbar: {
            background: 'mat-notadd-dark-700-bg',
            secondaryBackground: 'mat-notadd-dark-900-bg',
            collapsed: false,
            hidden: false,
            position: 'start'
        },
        toolbar: {
            background: 'mat-notadd-dark-500-bg',
            hidden: false,
            position: 'below-static'
        },
        footer: {
            background: 'mat-notadd-dark-900-bg',
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
