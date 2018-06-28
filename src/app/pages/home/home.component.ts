import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../services/search.service';
import { FoursquareService } from '../../services/foursquare.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public afterSearch = false;
  public venues;
  public venuePhotos;
  public maxVenues;
  constructor(private searchService:SearchService,private fourSquareService:FoursquareService) { }

  ngOnInit() {
    this.maxVenues = this.fourSquareService.maxResults;
    this.searchService.isSearched().subscribe( isSearched =>{
      this.afterSearch = isSearched;
    });
    this.venues = this.searchService.getSearchResults();
    this.venuePhotos = this.searchService.getSearchResultPhotos();
  }
  

}
