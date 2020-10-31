import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { enableProdMode, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SLIMSCROLL_DEFAULTS } from 'ngx-slimscroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppService } from './app-service.service';

enableProdMode()

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [
    {
      provide: SLIMSCROLL_DEFAULTS,
      useValue: {
        alwaysVisible: true,
        gridOpacity: '0.2',
        barOpacity: '0.5',
        gridBackground: '#c2c2c2',
        gridWidth: '6',
        gridMargin: '2px 2px',
        barBackground: '#515151',
        barWidth: '6',
        barMargin: '2px 2px'
      },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// platformBrowserDynamic().bootstrapModule(AppModule);