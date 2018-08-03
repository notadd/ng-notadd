import { Component } from '@angular/core';
import { NotaddLoadingService } from '@notadd/services/notadd-loading.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        private notaddLoadingService: NotaddLoadingService,
    ) {
    }
}
