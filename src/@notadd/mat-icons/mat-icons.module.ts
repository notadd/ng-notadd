import { NgModule } from '@angular/core';
import { MatIconRegistry, MatIconModule } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

@NgModule({
    imports: [
        MatIconModule,
        HttpModule
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
    }
}
