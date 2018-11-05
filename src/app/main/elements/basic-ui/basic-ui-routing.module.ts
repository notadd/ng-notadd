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
            title: '按钮',
            hasContentHeader: true
        }
    },
    {
        path: 'cards',
        component: CardsComponent,
        data: {
            title: '卡片',
            hasContentHeader: true
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
            title: '列表',
            hasContentHeader: true
        }
    },
    {
        path: 'badges',
        component: BadgesComponent,
        data: {
            title: '徽章',
            hasContentHeader: true
        }
    },
    {
        path: 'progress-bar',
        component: ProgressBarComponent,
        data: {
            title: '进度条',
            hasContentHeader: true
        }
    },
    {
        path: 'button-toggle',
        component: ButtonToggleComponent,
        data: {
            title: '开关按钮',
            hasContentHeader: true
        }
    },
    {
        path: 'chips',
        component: ChipsComponent,
        data: {
            title: '标签',
            hasContentHeader: true
        }
    },
    {
        path: 'expansion-panel',
        component: ExpansionPanelComponent,
        data: {
            title: '可展开面板',
            hasContentHeader: true
        }
    },
    {
        path: 'tabs',
        component: TabsComponent,
        data: {
            title: '选项卡',
            hasContentHeader: true
        }
    },
    {
        path: 'stepper',
        component: StepperComponent,
        data: {
            title: '步进器',
            hasContentHeader: true
        }
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    declarations: []
})
export class BasicUiRoutingModule {
}
