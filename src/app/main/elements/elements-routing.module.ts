import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { routingPathConfig } from '@config/routing-path.config';

const routes: Routes = [
    {
        path: routingPathConfig.elements.default,
        redirectTo: routingPathConfig.elements.basicUi,
        pathMatch: 'full',
    },
    {
        path: routingPathConfig.elements.basicUi,
        loadChildren: './basic-ui/basic-ui.module#BasicUiModule',
        data: {
            title: '基础 UI'
        }
    },
    {
        path: routingPathConfig.elements.ngMaterial2,
        loadChildren: './ng-material2/ng-material2.module#NgMaterial2Module',
        data: {
            title: '拓展组件'
        }
    },
    {
        path: routingPathConfig.elements.angularCdk,
        loadChildren: './angular-cdk/angular-cdk.module#AngularCdkModule',
        data: {
            title: 'Angular CDK'
        }
    },
    {
        path: routingPathConfig.elements.dataTable,
        loadChildren: './data-table/data-table.module#DataTableModule',
        data: {
            title: '数据表'
        }
    },
    {
        path: routingPathConfig.elements.advancedUi,
        loadChildren: './advanced-ui/advanced-ui.module#AdvancedUiModule',
        data: {
            title: '高级组件'
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: [],
    exports: [
        RouterModule
    ]
})
export class ElementsRoutingModule {
}
