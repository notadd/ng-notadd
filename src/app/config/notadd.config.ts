import { NotaddConfig } from '@notadd/types/notadd-config';

export const notaddConfig: NotaddConfig = {
    layout          : {
        style    : 'vertical-layout-1',
        width    : 'fullwidth',
        navbar   : {
            background: 'mat-notadd-dark-700-bg',
            folded    : false,
            hidden    : false,
            position  : 'left',
            variant   : 'vertical-style-1'
        },
        toolbar  : {
            background: 'mat-notadd-dark-500-bg',
            hidden    : false,
            position  : 'below-static'
        },
        footer   : {
            background: 'mat-notadd-dark-900-bg',
            hidden    : false,
            position  : 'below-fixed'
        },
        sidepanel: {
            hidden  : false,
            position: 'right'
        }
    },
    customScrollbars: true
};
