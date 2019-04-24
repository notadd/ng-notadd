import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    get copyrightYear() {
        return new Date().getFullYear();
    }

    constructor() {
    }

    ngOnInit() {
    }

}
