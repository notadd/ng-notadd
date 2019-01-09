import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'basic-ui',
        pathMatch: 'full',
    },
    {
        path: 'basic-ui',
        loadChildren: './basic-ui/basic-ui.module#BasicUiModule',
        data: {
            title: '基础 UI'
        }
    },
    {
        path: 'ng-material2',
        loadChildren: './ng-material2/ng-material2.module#NgMaterial2Module',
        data: {
            title: '拓展组件'
        }
    },
    {
        path: 'angular-cdk',
        loadChildren: './angular-cdk/angular-cdk.module#AngularCdkModule',
        data: {
            title: 'Angular CDK'
        }
    },
    {
        path: 'data-table',
        loadChildren: './data-table/data-table.module#DataTableModule',
        data: {
            title: '数据表'
        }
    },
    {
        path: 'advanced-ui',
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
