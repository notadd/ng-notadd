import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VirtualListComponent } from './virtual-list/virtual-list.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'virtual-list',
        pathMatch: 'full',
    },
    {
        path: 'virtual-list',
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
