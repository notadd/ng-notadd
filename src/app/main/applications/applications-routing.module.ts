import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'roles-permissions',
        pathMatch: 'full',
    },
    {
        path: 'roles-permissions',
        loadChildren: './roles-permissions/roles-permissions.module#RolesPermissionsModule',
        data: {
            title: '角色 & 权限'
        }
    },
    {
        path: 'users',
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
