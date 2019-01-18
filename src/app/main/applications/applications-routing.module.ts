import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routingPathConfig } from '@config/routing-path.config';

const routes: Routes = [
    {
        path: routingPathConfig.applications.default,
        redirectTo: 'roles-permissions',
        pathMatch: 'full',
    },
    {
        path: routingPathConfig.applications.rolesPermissions,
        loadChildren: './roles-permissions/roles-permissions.module#RolesPermissionsModule',
        data: {
            title: '角色 & 权限'
        }
    },
    {
        path: routingPathConfig.applications.users,
        loadChildren: './users/users.module#UsersModule',
        data: {
            title: '用户'
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
export class ApplicationsRoutingModule {
}
