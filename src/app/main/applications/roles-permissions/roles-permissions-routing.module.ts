import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoleService } from './role/role.service';
import { RolesComponent } from './roles/roles.component';
import { RoleComponent } from './role/role.component';
import { PermissionsComponent } from './permissions/permissions.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'roles',
        pathMatch: 'full',
    },
    {
        path: 'roles',
        component: RolesComponent,
        data: {
            title: '角色',
            hasContentHeader: false
        }
    },
    {
        path: 'roles/:id',
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
        path: 'permissions',
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
