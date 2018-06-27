import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class SearchService {
  public afterSearch = new BehaviorSubject<boolean>(false);
  public searchTerms = new BehaviorSubject<Object>({ searchFor: '', searchIn: '' });
  public searchResults = new BehaviorSubject<Array<Object>>([]);

  constructor() { }

  isSearched(): Observable<boolean> {
    return this.afterSearch.asObservable();
  }

  onSearched({ searchFor, searchIn }): void {
    this.afterSearch.next(true);
    // this.searchTerms.next({ searchFor, searchIn });
  }

  getSearchTerms(): Observable<Object> {
    return this.searchTerms.asObservable();
  }

  onSearchResults(results:Array<Object>): void {
    this.searchResults.next(results);
  }

  getSearchResults(): Observable<Object> {
    return this.searchResults.asObservable();
  }

}
