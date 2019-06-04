import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AngularFireModule } from '@angular/fire';
import { ServiceWorkerModule } from '@angular/service-worker';
import 'hammerjs';

import { TranslateModule } from '@ngx-translate/core';
import { NgForageConfig, Driver } from 'ngforage';
import { NgxPermissionsModule } from 'ngx-permissions';

import { NotaddModule } from '@notadd/notadd.module';
import { NotaddErrorsModule } from '@notadd/errors/errors.module';
import { NotaddMatIconsModule } from '@notadd/mat-icons/mat-icons.module';
import { NotaddProgressBarModule, NotaddSidebarModule, NotaddThemePanelModule } from '@notadd/components';
import { NotaddMatPaginatorIntlService } from '@notadd/services/notadd-mat-paginator-intl.service';

import { LayoutModule } from './layout/layout.module';

import { notaddConfig } from '@config/notadd.config';
import { environment } from '@env';

import { GraphQLModule } from '@graphql/graphql.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatSnackBarModule,

        TranslateModule.forRoot(),
        NgxPermissionsModule.forRoot(),

        /* @notadd modules */
        NotaddModule.forRoot(notaddConfig),
        NotaddErrorsModule,
        NotaddMatIconsModule,
        NotaddProgressBarModule,
        NotaddSidebarModule,
        NotaddThemePanelModule,

        LayoutModule,

        GraphQLModule,

        HttpClientModule,

        AppRoutingModule,

        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),

    ],
    providers: [{
        provide: MatPaginatorIntl, useClass: NotaddMatPaginatorIntlService
    }],
    bootstrap: [ AppComponent ]
})
export class AppModule {
    constructor(ngfConfig: NgForageConfig) {
        /* configuration NgForage*/
        ngfConfig.configure({
            name: 'Notadd',
            driver: [ // defaults to indexedDB -> webSQL -> localStorage
                Driver.INDEXED_DB,
                Driver.LOCAL_STORAGE
            ]
        });
    }
}
