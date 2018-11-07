import { Component, HostBinding, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { notaddAnimations } from '@notadd/animations';
import { NotaddConfigService } from '@notadd/services/config.service';
import { NotaddSidebarService } from '@notadd/components/sidebar/sidebar.service';
import { NotaddTranslationService } from '@notadd/services/translation.service';

import { locale as themePanelEnglish } from './i18n/en';
import { locale as themePanelZh_Hans } from './i18n/zh-Hans';
import { locale as themePanelZh_Hant } from './i18n/zh-Hant';

@Component({
    selector: 'notadd-theme-panel',
    templateUrl: './theme-panel.component.html',
    styleUrls: ['./theme-panel.component.scss'],
    animations: notaddAnimations
})
export class NotaddThemePanelComponent implements OnInit, OnDestroy {

    notaddConfig: any;
    form: FormGroup;

    @HostBinding('class.bar-closed')
    barClosed: boolean;

    private ngUnsubscribe: Subject<any>;

    constructor(
        private formBuilder: FormBuilder,
        private renderer: Renderer2,
        private configService: NotaddConfigService,
        private sidebarService: NotaddSidebarService,
        private translationService: NotaddTranslationService
    ) {
        this.barClosed = true;

        this.ngUnsubscribe = new Subject();
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            layout: this.formBuilder.group({
                style: [],
                width: [],
                navbar: this.formBuilder.group({
                    background: [],
                    secondaryBackground: [],
                    collapsed: [],
                    hidden: [],
                    position: []
                }),
                toolbar: this.formBuilder.group({
                    background: [],
                    hidden: [],
                    position: []
                }),
                footer: this.formBuilder.group({
                    background: [],
                    hidden: [],
                    position: []
                }),
                sidepanel: this.formBuilder.group({
                    hidden: [],
                    position: []
                })
            }),
            customScrollbars: []
        });

        this.configService.config
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((config) => {

                this.notaddConfig = config;

                this.form.setValue(config, {emitEvent: false});
            });

        this.form.valueChanges
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((config) => {
                this.configService.config = config;
            });

        this.translationService.setTranslation([themePanelZh_Hans, themePanelZh_Hant, themePanelEnglish]);
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();

    }

    private resetFormValues(type): void {
        const restValue = {
            'vertical-layout': {
                layout: {
                    width: 'fullwidth',
                    navbar: {
                        background: 'mat-notadd-dark-700-bg',
                        secondaryBackground: 'mat-notadd-dark-900-bg',
                        collapsed: false,
                        hidden: false,
                        position: 'left'
                    },
                    toolbar: {
                        background: 'mat-white-500-bg',
                        hidden: false,
                        position: 'below-static'
                    },
                    footer: {
                        background: 'mat-notadd-dark-900-bg',
                        hidden: false,
                        position: 'below-static'
                    }
                }
            }
        };

        this.form.patchValue(restValue[type]);
    }

    toggleSidebarOpen(key): void {
        this.sidebarService.getSidebar(key).toggleOpen();
    }
}
