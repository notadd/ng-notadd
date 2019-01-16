import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routingPathConfig } from '@config/routing-path.config';
import { VirtualListComponent } from './virtual-list/virtual-list.component';

const routes: Routes = [
    {
        path: routingPathConfig.angularCdk.default,
        redirectTo: routingPathConfig.angularCdk.virtualList,
        pathMatch: 'full',
    },
    {
        path: routingPathConfig.angularCdk.virtualList,
        component: VirtualListComponent,
        data: {
            title: '虚拟列表'
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
export class AngularCdkRoutingModule {
}
