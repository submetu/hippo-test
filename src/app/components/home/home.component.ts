import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public afterSearch = false;
  public venues= [];
  public maxVenues = 10;
  constructor(private searchService:SearchService) { }

  ngOnInit() {
    this.searchService.isSearched().subscribe( isSearched =>{
      this.afterSearch = isSearched;
    });
    this.searchService.getSearchResults().subscribe( (searchResults:Array<Object>) =>{
      this.venues = searchResults.splice(0, this.maxVenues);
    });
    
  }
  

}
