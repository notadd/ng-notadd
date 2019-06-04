import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateModule } from '@ngx-translate/core';

import { NotaddPipesModule } from '@notadd/pipes/pipes.module';
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
        MatMenuModule,

        NotaddPipesModule,

        TranslateModule.forChild()
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
