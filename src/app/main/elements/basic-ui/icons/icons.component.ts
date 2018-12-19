import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { cloneDeep } from 'lodash';
import { BaseIconGQL, MdiIconsGQL } from 'app/graphql/graphql.service';

export interface IconElement {
    icons: Array<any>;
    filteredIcons: Array<any>;
    sliceStart: number;
    scrollSize: number;
    isSearching: boolean;
}

@Component({
    selector: 'icons',
    templateUrl: './icons.component.html',
    styleUrls: ['./icons.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class IconsComponent implements OnInit {

    base: IconElement;
    mdi: IconElement;

    constructor(
        private baseIcon: BaseIconGQL,
        private mdiIcon: MdiIconsGQL
    ) {
        this.base = {
            icons: [],
            filteredIcons: [],
            sliceStart: 0,
            scrollSize: 2,
            isSearching: false
        };

        this.mdi = {
            icons: [],
            filteredIcons: [],
            sliceStart: 0,
            scrollSize: 200,
            isSearching: false
        };

    }

    ngOnInit() {
        this.baseIcon.watch()
            .valueChanges
            .pipe(
                map(result => result.data.baseIcon.categories)
            )
            .subscribe(baseIcons => {
                this.base.icons = baseIcons;
                this.base.filteredIcons = cloneDeep(baseIcons.slice(this.base.sliceStart, this.base.scrollSize));
            });

        this.mdiIcon.watch()
            .valueChanges
            .pipe(
                map(result => result.data.mdiIcons)
            )
            .subscribe(mdiIcons => {
                this.mdi.icons = mdiIcons;
                this.mdi.filteredIcons = cloneDeep(mdiIcons.slice(this.mdi.sliceStart, this.mdi.scrollSize));
            });
    }

    /**
     * 过滤 icons
     *
     * @param event
     */
    filterBaseIcons(event): void {
        const value = event.target.value;
        this.base.isSearching = !!value;

        if (this.base.isSearching) {
            this.base.filteredIcons = [];
            this.base.icons.map((category) => {
                const filterCategory = cloneDeep(category);
                filterCategory.icons = filterCategory.icons.filter(icon => icon.id.includes(value));
                this.base.filteredIcons.push(filterCategory);
            });
        } else {
            this.base.sliceStart = 0;
            this.base.scrollSize = 2;
            this.base.filteredIcons = cloneDeep(this.base.icons.slice(this.base.sliceStart, this.base.scrollSize));
        }
    }

    filterSvgIcons(event): void {
        const value = event.target.value;
        this.mdi.isSearching = !!value;

        if (this.mdi.isSearching) {
            this.mdi.filteredIcons = this.mdi.icons.filter(icon => {
                return icon.name.includes(value);
            });
        } else {
            this.mdi.sliceStart = 0;
            this.mdi.scrollSize = 200;
            this.mdi.filteredIcons = cloneDeep(this.mdi.icons.slice(this.mdi.sliceStart, this.mdi.scrollSize));
        }
    }

    onScrollComplete(type): void {
        const element: IconElement = this[type];
        if (!element.isSearching && element.scrollSize < element.icons.length) {
            element.sliceStart += 2;
            element.scrollSize += 2;
            element.filteredIcons = [...element.filteredIcons, ...element.icons.slice(element.sliceStart, element.scrollSize)];
        }
    }
}
