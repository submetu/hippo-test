import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FoursquareService {

  private client_id = "MKBS5RJL1JOYKX35SGQSPMZ2EWAGZXVDIUBZCCODSI4KML0Z";
  private client_secret = "5ANEUWLIDQJM54E4HGYJ2TCJGENOUR2OEXTJ2A00KXYBY0KA";
  private now = new Date();
  //get version date in YYYMMDD format for foursquare API ( requried )
  private versionDate = String(this.now.getFullYear())  + String( ((this.now.getMonth() + 1).toString().length === 1 )? ("0"+(this.now.getMonth() + 1)) :  (this.now.getMonth() + 1) ) + String(this.now.getDate());
  private configURL = `client_id=${this.client_id}&client_secret=${this.client_secret}&v=${this.versionDate}`;
  private exploreURL = `https://api.foursquare.com/v2/venues/explore?${this.configURL}`
  private venueURL = 'https://api.foursquare.com/v2/venues/';

  //CHANGE THIS TO 10 FOR SEEING MORE RESULTS -- DONE FOR LIMITING API REQUESTS TO THE FOURSQUARE API
  public maxResults:number = 4; 

  constructor(private http: HttpClient) { }

  getVenues(searchFor, searchIn): Observable<Object> {
    let apiUrl = this.exploreURL + `&query=${searchFor}&near=${searchIn}`;
    return this.http.get(apiUrl);
  }

  getVenue(venueId): Observable<Object>{
      let apiURL = `${this.venueURL}${venueId}?${this.configURL}`;
      return this.http.get(apiURL);
  }

  getPhotos(venueId):Observable<Object>{
    let apiURL = `${this.venueURL}${venueId}/photos?${this.configURL}`;
    return this.http.get(apiURL);
  }

}
