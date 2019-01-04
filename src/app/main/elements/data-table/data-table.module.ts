import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
} from '@angular/material';

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
