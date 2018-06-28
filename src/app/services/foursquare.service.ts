import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FoursquareService {

  private client_id = "VYI2L0XWR4AKKQIJZP4NMBCNL2DUN4LGSDMG5IATMWHR4PYQ";
  private client_secret = "S323TOHXEWUVPWOMHQ05S0SNDI4X05XVLH02THXMFJJK3IN2";
  private now = new Date();
  //get version date in YYYMMDD format for foursquare API ( requried )
  private versionDate = String(this.now.getFullYear())  + String( ((this.now.getMonth() + 1).toString().length === 1 )? ("0"+(this.now.getMonth() + 1)) :  (this.now.getMonth() + 1) ) + String(this.now.getDate());
  private configURL = `client_id=${this.client_id}&client_secret=${this.client_secret}&v=${this.versionDate}`;
  private exploreURL = `https://api.foursquare.com/v2/venues/explore?${this.configURL}`
  private venueURL = 'https://api.foursquare.com/v2/venues/';

  public maxResults:number = 1;

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
