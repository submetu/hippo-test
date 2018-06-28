import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { forkJoin } from "rxjs/observable/forkJoin";

import { StorageService } from './storage.service';
import { FoursquareService } from './foursquare.service';


@Injectable()
export class SearchService {
  public afterSearch = new BehaviorSubject<boolean>(false);
  public searchTerms = new BehaviorSubject<Object>({ searchFor: '', searchIn: '' });
  public searchResults = new BehaviorSubject<Array<Object>>([]);
  public searchResultsPhotos = new BehaviorSubject<Array<Object>>([]);

  constructor(private storageService: StorageService, private fourSquareService: FoursquareService) { }

  isSearched(): Observable<boolean> {
    return this.afterSearch.asObservable();
  }

  onSearched({ searchFor, searchIn }): void {
    this.storageService.saveItem('recent-searched', { searchFor, searchIn }, true);
    this.searchTerms.next({ searchFor, searchIn });
    this.afterSearch.next(true);
  }

  getSearchTerms(): Observable<Object> {
    return this.searchTerms.asObservable();
  }

  onSearchResults(results: Array<Object>): void {
    this.searchResults.next(results);
  }

  getSearchResults(): Observable<Array<Object>> {
    return this.searchResults.asObservable();
  }

  onSearchResultsPhotos(photos): void {
    this.searchResultsPhotos.next(photos);
  }

  getSearchResultPhotos(): Observable<Array<Object>> {
    return this.searchResultsPhotos.asObservable();
  }

  initSearch(searchTerms) {
    this.fourSquareService.getVenues(searchTerms.searchFor, searchTerms.searchIn).subscribe(resp => {
      let searchResults = resp['response'] && resp['response'].groups && resp['response'].groups[0] && resp['response'].groups[0].items;
      if (!searchResults) {
        throw new Error("Please revise Foursquare API");
      }
      let splicedSearchResults =searchResults.splice(0,this.fourSquareService.maxResults);
      this.onSearched(searchTerms);
      
      this.onSearchResults(splicedSearchResults);
      this.getPhotos(splicedSearchResults, this.fourSquareService.maxResults).then(photos => {
        this.onSearchResultsPhotos(photos);
      });
    });
  }
  getPhotos(searchResults, maxPhotosCount) {
    return new Promise((resolve, reject) => {
      let subscriptionsArr = [];
      let photoURLArr = [];
      
      searchResults.map(result => {
        let id = result.venue.id;
        subscriptionsArr.push(this.fourSquareService.getPhotos(id));
      });

      forkJoin(subscriptionsArr).subscribe(results => {
        photoURLArr = results.map(result => {
          let photo = result['response'].photos.items[0];
          let photoURL = photo && `${photo.prefix}290x290${photo.suffix}`;
          return photoURL;
        });
        if (photoURLArr.length === maxPhotosCount) {
          resolve(photoURLArr);
        } else {
          reject(new Error("Couldn't get photos"));
        }
      })

    });
  }
}
