import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserGroupComponent } from './user-group/user-group.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'user-group',
        pathMatch: 'full',
    },
    {
        path: 'user-group',
        component: UserGroupComponent,
        data: {
            title: '用户组',
            hasContentHeader: true
        }
    },
    {
        path: 'user',
        component: UserComponent,
        data: {
            title: '权限',
            hasContentHeader: true
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
export class UsersRoutingModule {
}
