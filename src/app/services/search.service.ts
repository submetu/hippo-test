import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import {StorageService} from './storage.service';

@Injectable()
export class SearchService {
  public afterSearch = new BehaviorSubject<boolean>(false);
  public searchTerms = new BehaviorSubject<Object>({ searchFor: '', searchIn: '' });
  public searchResults = new BehaviorSubject<Array<Object>>([]);

  constructor(private storageService: StorageService) { }

  isSearched(): Observable<boolean> {
    return this.afterSearch.asObservable();
  }

  onSearched({ searchFor, searchIn }): void {
    this.storageService.saveItem('recent-searched',{ searchFor, searchIn }, true);
    this.searchTerms.next({ searchFor, searchIn });
    this.afterSearch.next(true);
  }

  getSearchTerms(): Observable<Object> {
    return this.searchTerms.asObservable();
  }

  onSearchResults(results:Array<Object>): void {
    this.searchResults.next(results);
  }

  getSearchResults(): Observable<Array<Object>> {
    return this.searchResults.asObservable();
  }

}
