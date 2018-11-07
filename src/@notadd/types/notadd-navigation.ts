export interface NotaddNavigationItem {
    id: string;
    title: string;
    i18n?: string;
    type: 'item' | 'group' | 'collapse';
    icon?: string;
    hidden?: boolean;
    url?: string;
    classes?: string;
    badge?: {
        title?: string;
        bg?: string;
        fg?: string;
    };
    children?: Array<NotaddNavigationItem>;
}

export interface NotaddNavigation extends NotaddNavigationItem {
    children?: Array<NotaddNavigationItem>;
}
