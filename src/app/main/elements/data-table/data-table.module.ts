import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { NotaddSharedModule } from '@notadd/shared.module';

import { DataTableRoutingModule } from './data-table-routing.module';

import { DataTableComponent } from './data-table.component';
import { DataTableService } from './data-table.service';

@NgModule({
    imports: [
        CommonModule,

        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatPaginatorModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,

        NotaddSharedModule,

        DataTableRoutingModule
    ],
    declarations: [
        DataTableComponent
    ],
    providers: [
        DataTableService
    ]
})
export class DataTableModule { }
