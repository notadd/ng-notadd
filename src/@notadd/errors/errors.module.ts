import { CommonModule } from '@angular/common';
import { NgModule, ErrorHandler } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NotaddErrorsHandler } from './errors-handler/errors-handler.service';
import { NotaddErrorsService } from './errors.service';
import { NotaddErrorsRoutingModule } from './errors-routing.module';
import { NotaddErrorsComponent } from './errors-component/errors.component';

@NgModule({
    declarations: [
        NotaddErrorsComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,

        NotaddErrorsRoutingModule
    ],
    providers: [
        NotaddErrorsService,
        {
            provide: ErrorHandler, useClass: NotaddErrorsHandler
        }
    ]
})
export class NotaddErrorsModule {}
