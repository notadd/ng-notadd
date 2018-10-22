import { Component, HostBinding, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { notaddAnimations } from '@notadd/animations';
import { NotaddConfigService } from '@notadd/services/config.service';
import { NotaddSidebarService } from '@notadd/components/sidebar/sidebar.service';

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
        private sidebarService: NotaddSidebarService
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
