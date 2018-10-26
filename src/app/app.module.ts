import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import 'hammerjs';

import { NotaddModule } from '@notadd/notadd.module';
import { NotaddProgressBarModule, NotaddSidebarModule, NotaddThemePanelModule } from '@notadd/components';

import { LayoutModule } from './layout/layout.module';

import { notaddConfig } from './config/notadd.config';

import { GraphQLModule } from './graphql/graphql.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        /* @notadd modules */
        NotaddModule.forRoot(notaddConfig),
        NotaddProgressBarModule,
        NotaddSidebarModule,
        NotaddThemePanelModule,

        LayoutModule,

        AppRoutingModule,

        GraphQLModule,

        HttpClientModule
    ],
    providers: [],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
