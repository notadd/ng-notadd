import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';

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
