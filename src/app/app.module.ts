import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { VenueComponent } from './components/venue/venue.component';
import { HomeComponent } from './components/home/home.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { LogoComponent } from './components/logo/logo.component';

import {SearchService} from './services/search.service';
import {FoursquareService} from './services/foursquare.service';


@NgModule({
  declarations: [
    AppComponent,
    VenueComponent,
    HomeComponent,
    SearchFormComponent,
    LogoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    SearchService,
    FoursquareService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
