import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ButtonsComponent } from './buttons/buttons.component';
import { CardsComponent } from './cards/cards.component';
import { IconsComponent } from './icons/icons.component';
import { ListComponent } from './list/list.component';
import { BadgesComponent } from './badges/badges.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ButtonToggleComponent } from './button-toggle/button-toggle.component';
import { ChipsComponent } from './chips/chips.component';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { TabsComponent } from './tabs/tabs.component';
import { StepperComponent } from './stepper/stepper.component';
import { GridListComponent } from './grid-list/grid-list.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'buttons',
        pathMatch: 'full',
    },
    {
        path: 'buttons',
        component: ButtonsComponent,
        data: {
            title: '按钮'
        }
    },
    {
        path: 'cards',
        component: CardsComponent,
        data: {
            title: '卡片'
        }
    },
    {
        path: 'icons',
        component: IconsComponent,
        data: {
            title: '图标',
            hasContentHeader: false
        }
    },
    {
        path: 'list',
        component: ListComponent,
        data: {
            title: '列表'
        }
    },
    {
        path: 'badges',
        component: BadgesComponent,
        data: {
            title: '徽章'
        }
    },
    {
        path: 'progress-bar',
        component: ProgressBarComponent,
        data: {
            title: '进度条'
        }
    },
    {
        path: 'button-toggle',
        component: ButtonToggleComponent,
        data: {
            title: '开关按钮'
        }
    },
    {
        path: 'chips',
        component: ChipsComponent,
        data: {
            title: '标签'
        }
    },
    {
        path: 'expansion-panel',
        component: ExpansionPanelComponent,
        data: {
            title: '可展开面板'
        }
    },
    {
        path: 'tabs',
        component: TabsComponent,
        data: {
            title: '选项卡'
        }
    },
    {
        path: 'stepper',
        component: StepperComponent,
        data: {
            title: '步进器'
        }
    },
    {
        path: 'grid-list',
        component: GridListComponent,
        data: {
            title: '网格列表'
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
export class BasicUiRoutingModule {
}
