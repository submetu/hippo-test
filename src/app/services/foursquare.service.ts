import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FoursquareService {

  private client_id = "MZICQCMIA25GD3MX5WDXCX2TRTZGPWAB4ZK5AUOADLPVSMWZ";
  private client_secret = "EOBIGLHNCBLH0P22LBNPN1I03KGMUXRM2LTLTMGNQVVZMJFA";
  private now = new Date();
  //get version date in YYYMMDD format for foursquare API ( requried )
  private versionDate = String(this.now.getFullYear())  + String( ((this.now.getMonth() + 1).toString().length === 1 )? ("0"+(this.now.getMonth() + 1)) :  (this.now.getMonth() + 1) ) + String(this.now.getDate());
  private configUrl = `https://api.foursquare.com/v2/venues/explore?client_id=${this.client_id}&client_secret=${this.client_secret}&v=${this.versionDate}`

  constructor(private http: HttpClient) { }

  getVenues(searchFor, searchIn): Observable<Object> {
    let apiUrl = this.configUrl + `&query=${searchFor}&near=${searchIn}`;
    return this.http.get(apiUrl);
  }

}
