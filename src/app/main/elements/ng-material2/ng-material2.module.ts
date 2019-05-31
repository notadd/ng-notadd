import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotaddSharedModule } from '@notadd/shared.module';

import { NmAlertModule, NmCarouselModule, NmCascadeDropdownlistModule } from '@notadd/ng-material-pro';

import { NmMaterial2RoutingModule } from './ng-material2-routing.module';

import { AlertComponent } from './alert/alert.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CascadeDropdownlistComponent } from './cascade-dropdownlist/cascade-dropdownlist.component';

@NgModule({
    imports: [
        CommonModule,

        NotaddSharedModule,
        NmAlertModule,
        NmCarouselModule,
        NmCascadeDropdownlistModule,

        NmMaterial2RoutingModule
    ],
    declarations: [
        AlertComponent,
        CarouselComponent,
        CascadeDropdownlistComponent
    ]
})
export class NgMaterial2Module { }
