import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routingPathConfig } from '@config/routing-path.config';
import { AlertComponent } from './alert/alert.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CascadeDropdownlistComponent } from './cascade-dropdownlist/cascade-dropdownlist.component';

const routes: Routes = [
    {
        path: routingPathConfig.ngMaterial2.default,
        redirectTo: routingPathConfig.ngMaterial2.alert,
        pathMatch: 'full',
    },
    {
        path: routingPathConfig.ngMaterial2.alert,
        component: AlertComponent,
        data: {
            title: '提示框'
        }
    },
    {
        path: routingPathConfig.ngMaterial2.carousel,
        component: CarouselComponent,
        data: {
            title: '轮播图'
        }
    },
    {
        path: routingPathConfig.ngMaterial2.cascadeDropdownlist,
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
