import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routingPathConfig } from '@config/routing-path.config';
import { RoleService } from './role/role.service';
import { RolesComponent } from './roles/roles.component';
import { RoleComponent } from './role/role.component';
import { PermissionsComponent } from './permissions/permissions.component';

const routes: Routes = [
    {
        path: routingPathConfig.rolesPermissions.default,
        redirectTo: routingPathConfig.rolesPermissions.roles,
        pathMatch: 'full',
    },
    {
        path: routingPathConfig.rolesPermissions.roles,
        component: RolesComponent,
        data: {
            title: '角色',
            hasContentHeader: false
        }
    },
    {
        path: routingPathConfig.rolesPermissions.role,
        component: RoleComponent,
        data: {
            title: '角色',
            hasContentHeader: false
        },
        resolve: {
            data: RoleService
        }
    },
    {
        path: routingPathConfig.rolesPermissions.permission,
        component: PermissionsComponent,
        data: {
            title: '权限',
            hasContentHeader: false
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
export class RolesPermissionsRoutingModule {
}
