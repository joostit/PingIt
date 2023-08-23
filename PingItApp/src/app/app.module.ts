import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NotifierModule } from 'angular-notifier';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NotifierModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
