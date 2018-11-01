import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { cloneDeep } from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { BaseIconGQL, MdiIconsGQL } from 'app/graphql/graphql.service';

@Component({
    selector: 'icons',
    templateUrl: './icons.component.html',
    styleUrls: ['./icons.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class IconsComponent implements OnInit {

    baseIcons: Array<any>;
    filteredBaseIcons: Array<any>;

    mdiIcons: Array<any>;
    filteredMdiIcons: Array<any>;

    constructor(
        private baseIcon: BaseIconGQL,
        private mdiIcon: MdiIconsGQL,
        iconRegistry: MatIconRegistry, sanitizer: DomSanitizer
    ) {
        iconRegistry.addSvgIcon(
            'github',
            sanitizer.bypassSecurityTrustResourceUrl('assets/icons/github-circle-white-transparent.svg'));
    }

    ngOnInit() {
        this.baseIcon.watch()
            .valueChanges
            .pipe(
                map(result => result.data.baseIcon.categories)
            )
            .subscribe(baseIcons => {
                this.baseIcons = baseIcons;
                this.filteredBaseIcons = cloneDeep(this.baseIcons);
            });

        this.mdiIcon.watch()
            .valueChanges
            .pipe(
                map(result => result.data.mdiIcons)
            )
            .subscribe(mdiIcons => {
                this.mdiIcons = mdiIcons;
                this.filteredMdiIcons = cloneDeep(this.mdiIcons);
            });
    }

    /**
     * 过滤 icons
     *
     * @param event
     */
    filterBaseIcons(event): void {
        const value = event.target.value;

        this.baseIcons.map((category, index) => {
            this.filteredBaseIcons[index].icons = category.icons.filter(icon => {
                return icon.id.includes(value);
            });
        });
    }

    filterSvgIcons(event): void {
        const value = event.target.value;

        this.filteredMdiIcons = this.mdiIcons.filter(icon => {
            return icon.name.includes(value);
        });
    }

}
