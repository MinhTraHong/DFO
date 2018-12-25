import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { PagesComponent } from './views/pages.component';
import { LayoutModule } from './views/_layouts/layout.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CookieModule } from 'ngx-cookie';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScriptLoaderService } from "./services/base/script-loader.service";
import { PagesRoutingModule } from "./views/pages-routing.module";

@NgModule({
    declarations: [
        PagesComponent,
        AppComponent,
    ],
    imports: [
        LayoutModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        PagesRoutingModule,
        HttpModule,
        CookieModule.forRoot()
    ],
    providers: [ScriptLoaderService],
    bootstrap: [AppComponent]
})
export class AppModule { }