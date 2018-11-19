import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'general',
        loadChildren: './main/general/general.module#GeneralModule',
        data: { title: '常规' }
    },
    {
        path: 'elements',
        loadChildren: './main/elements/elements.module#ElementsModule',
        data: { title: 'UI 元素' }
    },
    {
        path: '**',
        redirectTo: 'general/dashboards/analytics'
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
