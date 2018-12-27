import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlertComponent } from './alert/alert.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CascadeDropdownlistComponent } from './cascade-dropdownlist/cascade-dropdownlist.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'alert',
        pathMatch: 'full',
    },
    {
        path: 'alert',
        component: AlertComponent,
        data: {
            title: '提示框'
        }
    },
    {
        path: 'carousel',
        component: CarouselComponent,
        data: {
            title: '轮播图'
        }
    },
    {
        path: 'cascade-dropdownlist',
        component: CascadeDropdownlistComponent,
        data: {
            title: '多级联动'
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [],
    exports: [
        RouterModule
    ]
})
export class NmMaterial2RoutingModule {
}
