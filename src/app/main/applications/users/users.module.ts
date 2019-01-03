import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGroupComponent } from './user-group/user-group.component';
import { UserComponent } from './user/user.component';

import { UsersRoutingModule } from './users-routing.module';

@NgModule({
    imports: [
        CommonModule,
        UsersRoutingModule
    ],
    declarations: [UserGroupComponent, UserComponent]
})
export class UsersModule {
}
