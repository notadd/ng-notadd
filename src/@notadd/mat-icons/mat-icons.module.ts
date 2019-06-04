import { NgModule } from '@angular/core';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
    imports: [
        MatIconModule
    ]
})
export class NotaddMatIconsModule {
    constructor(
        matIconRegistry: MatIconRegistry,
        domSanitizer: DomSanitizer
    ) {
        /*
         * Material Design Icons.
         * view on https://materialdesignicons.com
         */
        matIconRegistry.addSvgIconSetInNamespace(
            'mdi',
            domSanitizer.bypassSecurityTrustResourceUrl('assets/mdi.svg')
        );

        /* Notadd icon font */
        matIconRegistry.registerFontClassAlias('NotaddIcon', 'notadd-icon');

        /*
         * Weather Icons.
         * view on https://erikflowers.github.io/weather-icons/
         */
        matIconRegistry.registerFontClassAlias('weathericons', 'wi');
    }
}
