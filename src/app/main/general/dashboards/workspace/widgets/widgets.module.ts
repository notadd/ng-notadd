import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule, MatDividerModule } from '@angular/material';
import { DynamicModule } from 'ng-dynamic-component';

import { NotaddSharedModule } from '@notadd/shared.module';
import { NotaddWidgetModule } from '@notadd/components';

import { GithubComponent } from './github/github.component';

@NgModule({
    declarations: [
        GithubComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatDividerModule,

        NotaddSharedModule,
        NotaddWidgetModule,

        DynamicModule.withComponents([
            GithubComponent
        ])
    ],
    entryComponents: [
        GithubComponent
    ],
    exports: [
        DynamicModule
    ]
})
export class WidgetsModule {
}
