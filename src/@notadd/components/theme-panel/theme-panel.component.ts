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

    // Private
    private ngUnsubscribe: Subject<any>;

    constructor(
        private formBuilder: FormBuilder,
        private renderer: Renderer2,
        private configService: NotaddConfigService,
        private sidebarService: NotaddSidebarService
    ) {
        // Set the defaults
        this.barClosed = true;

        // Set the private defaults
        this.ngUnsubscribe = new Subject();
    }

    ngOnInit() {
        // Build the config form
        // noinspection TypeScriptValidateTypes
        this.form = this.formBuilder.group({
            layout: this.formBuilder.group({
                style: [],
                width: [],
                navbar: this.formBuilder.group({
                    background: [],
                    folded: [],
                    hidden: [],
                    position: [],
                    variant: []
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

        // Subscribe to the config changes
        this.configService.config
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((config) => {

                // Update the stored config
                this.notaddConfig = config;

                // Set the config form values without emitting an event
                // so that we don't end up with an infinite loop
                this.form.setValue(config, {emitEvent: false});
            });

        // Subscribe to the specific form value changes (layout.style)
        this.form.get('layout.style').valueChanges
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((value) => {

                // Reset the form values based on the
                // selected layout style
                this.resetFormValues(value);

            });

        // Subscribe to the form value changes
        this.form.valueChanges
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((config) => {

                // Update the config
                this.configService.config = config;
            });

    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();

    }

    /**
     * Reset the form values based on the
     * selected layout style
     *
     * @param type
     * @private
     */
    private resetFormValues(type): void {
        const restValue = {
            'vertical-layout': {
                layout: {
                    width: 'fullwidth',
                    navbar: {
                        background: 'mat-notadd-dark-700-bg',
                        folded: false,
                        hidden: false,
                        position: 'left',
                        variant: 'vertical-style-1'
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

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this.sidebarService.getSidebar(key).toggleOpen();
    }
}
