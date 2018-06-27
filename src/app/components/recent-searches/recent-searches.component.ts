import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { StorageService } from '../../services/storage.service';
import { FoursquareService } from '../../services/foursquare.service';

@Component({
  selector: 'app-recent-searches',
  templateUrl: './recent-searches.component.html',
  styleUrls: ['./recent-searches.component.css']
})
export class RecentSearchesComponent implements OnInit {

  constructor(
    private searchService:SearchService, 
    private storageService:StorageService,
    private fourSquareService: FoursquareService
  
  ) { }

  public recentSearches = null;

  ngOnInit() {
    this.searchService.getSearchTerms().subscribe(searchTerms => {
      let _recentSearches = this.storageService.getItem('recent-searched');
      try{
       _recentSearches =  JSON.parse(_recentSearches);
      }
      catch(e){
        return console.log(e);
      }

      if(_recentSearches && _recentSearches.constructor === Array){
        this.recentSearches = _recentSearches
      }
    });
  }
  searchVenues(e){
    console.log('clicked')
    this.fourSquareService.getVenues(e.searchFor, e.searchIn).subscribe(resp => {
      this.searchService.onSearched(e);
      this.searchService.onSearchResults(resp['response'].groups[0].items);
    });
  }

}
