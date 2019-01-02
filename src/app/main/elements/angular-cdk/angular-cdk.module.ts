import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

import { NotaddSharedModule } from '@notadd/shared.module';

import { MatButtonModule } from '@angular/material';

import { AngularCdkRoutingModule } from './angular-cdk-routing.module';

import { VirtualListComponent } from './virtual-list/virtual-list.component';
import { VirtualListService } from './virtual-list/virtual-list.service';

@NgModule({
    imports: [
        CommonModule,
        ScrollDispatchModule,
        NotaddSharedModule,

        MatButtonModule,

        AngularCdkRoutingModule
    ],
    declarations: [
        VirtualListComponent
    ],
    providers: [
        VirtualListService
    ]
})
export class AngularCdkModule { }
