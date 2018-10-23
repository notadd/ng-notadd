import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'modules',
        loadChildren: './main/modules/modules.module#ModulesModule',
        data: { title: '首页' }
    },
    {
        path: '**',
        redirectTo: 'modules/dashboards/analytics'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    declarations: [],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
