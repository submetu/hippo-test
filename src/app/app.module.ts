import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { VenueComponent } from './components/venue/venue.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { LogoComponent } from './components/logo/logo.component';
import { RecentSearchesComponent } from './components/recent-searches/recent-searches.component';

import {SearchService} from './services/search.service';
import {FoursquareService} from './services/foursquare.service';
import {StorageService} from './services/storage.service';
import { VenuePageComponent } from './pages/venue-page/venue-page.component';
import { TipsComponent } from './components/tips/tips.component';


@NgModule({
  declarations: [
    AppComponent,
    VenueComponent,
    HomeComponent,
    SearchFormComponent,
    LogoComponent,
    RecentSearchesComponent,
    VenuePageComponent,
    TipsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    SearchService,
    FoursquareService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
