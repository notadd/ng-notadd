import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {
    MatTabsModule,
    MatTableModule,
    MatRippleModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatListModule,
    MatDividerModule,
    MatExpansionModule,
    MatDialogModule,
    MatRadioModule,
    MatTreeModule
} from '@angular/material';

import { NotaddSharedModule } from '@notadd/shared.module';

import { RoleService } from './role/role.service';

import { RolesComponent } from './roles/roles.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { FeaturePermissionIndeterminatePipe, FeaturePermissionCheckedAllPipe } from './permissions/permissions.pipe';

import { RolesPermissionsRoutingModule } from './roles-permissions-routing.module';
import { RoleComponent } from './role/role.component';
import { AdvancedSettingsComponent } from './permissions/advanced-settings/advanced-settings.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
        MatTableModule,
        MatRippleModule,
        MatButtonModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatListModule,
        MatDividerModule,
        MatExpansionModule,
        MatDialogModule,
        MatRadioModule,
        MatTreeModule,

        NotaddSharedModule,

        RolesPermissionsRoutingModule
    ],
    declarations: [
        RolesComponent,
        PermissionsComponent,
        RoleComponent,
        FeaturePermissionIndeterminatePipe,
        FeaturePermissionCheckedAllPipe,
        AdvancedSettingsComponent
    ],
    entryComponents: [
        AdvancedSettingsComponent
    ],
    providers: [
        RoleService
    ]
})
export class RolesPermissionsModule {
}
