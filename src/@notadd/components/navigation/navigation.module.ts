import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatRippleModule, MatMenuModule } from '@angular/material';

import { NotaddNavigationComponent } from './navigation.component';
import { NotaddNavGroupComponent } from './nav-group/nav-group.component';
import { NotaddNavCollapseComponent } from './nav-collapse/nav-collapse.component';
import { NotaddNavItemComponent } from './nav-item/nav-item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,

        MatIconModule,
        MatRippleModule,
        MatMenuModule
    ],
    declarations: [
        NotaddNavigationComponent,
        NotaddNavGroupComponent,
        NotaddNavCollapseComponent,
        NotaddNavItemComponent
    ],
    exports: [
        NotaddNavigationComponent
    ]
})
export class NotaddNavigationModule {
}
