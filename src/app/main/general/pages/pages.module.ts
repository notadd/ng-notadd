import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotaddSharedModule } from '@notadd/shared.module';
import { ProfileComponent } from './profile/profile.component';
import { MatCardModule, MatButtonModule, MatIconModule, MatTabsModule, MatListModule } from '@angular/material';

const routs: Routes = [
    {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full',
    },
    {
        path: 'profile',
        component: ProfileComponent,
        data: {
            title: '个人信息',
            hasContentHeader: false
        }
    }
];

@NgModule({
    imports: [
        NotaddSharedModule,
        RouterModule.forChild(routs),

        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatListModule
    ],
    declarations: [
        ProfileComponent
    ]
})
export class PagesModule {
}
