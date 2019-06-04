import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
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
