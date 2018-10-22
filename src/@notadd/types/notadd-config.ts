export interface NotaddConfig {
    layout: {
        style: string,
        width: 'fullwidth' | 'boxed',
        navbar: {
            background: string,
            secondaryBackground: string,
            hidden: boolean,
            collapsed: boolean,
            position: 'start' | 'end'
        },
        toolbar: {
            background: string,
            hidden: boolean,
            position: 'above' | 'above-static' | 'above-fixed' | 'below' | 'below-static' | 'below-fixed'
        },
        footer: {
            background: string,
            hidden: boolean,
            position: 'above' | 'above-static' | 'above-fixed' | 'below' | 'below-static' | 'below-fixed'
        },
        sidepanel: {
            hidden: boolean,
            position: 'left' | 'right'
        }
    };
    customScrollbars: boolean;
}
