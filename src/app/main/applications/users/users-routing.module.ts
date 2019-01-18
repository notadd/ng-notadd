import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routingPathConfig } from '@config/routing-path.config';
import { UserGroupComponent } from './user-group/user-group.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
    {
        path: routingPathConfig.users.default,
        redirectTo: routingPathConfig.users.userGroup,
        pathMatch: 'full',
    },
    {
        path: routingPathConfig.users.userGroup,
        component: UserGroupComponent,
        data: {
            title: '用户组',
            hasContentHeader: true
        }
    },
    {
        path: routingPathConfig.users.user,
        component: UserComponent,
        data: {
            title: '用户',
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
