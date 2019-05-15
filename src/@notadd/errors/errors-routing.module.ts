import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotaddErrorsComponent } from './errors-component/errors.component';

const routes: Routes = [
    {
        path: 'error/:code',
        component: NotaddErrorsComponent,
        data: {
            title: '错误页',
            isFullScreen: true
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class NotaddErrorsRoutingModule {}
