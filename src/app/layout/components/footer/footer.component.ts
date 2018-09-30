import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer
    ) {
    }

    ngOnInit() {
        /* 自定义 svg icon */
        this.matIconRegistry.addSvgIconInNamespace(
            'notadd-svg',
            'github',
            this.domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github-circle-white-transparent.svg')
        );
    }

}
