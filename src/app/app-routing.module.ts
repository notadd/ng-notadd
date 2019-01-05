import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'general/dashboards/analytics',
        pathMatch: 'full'
    },
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
        path: 'applications',
        loadChildren: './main/applications/applications.module#ApplicationsModule',
        data: { title: '应用' }
    },
    {
        path: 'services',
        loadChildren: './main/services/services.module#ServicesModule',
        data: { title: 'Service' }
    },
    {
        path: '**',
        redirectTo: 'general/pages/errors/404'
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
