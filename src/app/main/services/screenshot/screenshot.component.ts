import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';

import { NotaddScreenshotService } from '@notadd/services/notadd-screenshot.service';

@Component({
    selector: 'screenshot',
    templateUrl: './screenshot.component.html',
    styleUrls: ['./screenshot.component.scss']
})
export class ScreenshotComponent implements OnInit {

    @ViewChild('screen') screen: ElementRef;

    constructor(
        private screenshotService: NotaddScreenshotService,
    ) {
    }

    ngOnInit() {
    }

    capture() {
        this.screenshotService.capture(this.screen.nativeElement);
    }
}
