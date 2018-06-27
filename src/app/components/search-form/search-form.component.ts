import { Component, OnInit } from '@angular/core';
import {SearchService} from '../../services/search.service';
import {FoursquareService} from '../../services/foursquare.service';



@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  
  public afterSearch;
  public searchIn;
  public searchFor;

  constructor(private searchService:SearchService,private fourSquareService:FoursquareService) { }
  
  ngOnInit() {
    this.searchService.isSearched().subscribe( isSearched =>{
      this.afterSearch = isSearched;
    });
    this.searchService.getSearchTerms().subscribe( searchTerms =>{
      this.searchIn = searchTerms['searchIn'];
      this.searchFor = searchTerms['searchFor'];
    });
  }
  searchSubmit(e){
    this.fourSquareService.getVenues(e.searchFor,e.searchIn).subscribe( resp =>{
      this.searchService.onSearched(e);
      this.searchService.onSearchResults(resp['response'].groups[0].items);
    });
  }

}
