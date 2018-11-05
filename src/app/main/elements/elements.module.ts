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
        data: { title: '基础 UI' }
    }
];

@NgModule({
  imports: [
      RouterModule.forChild(routes)
  ],
  declarations: []
})
export class ElementsModule { }
