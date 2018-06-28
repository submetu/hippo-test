import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {FoursquareService} from '../../services/foursquare.service'


@Component({
  selector: 'app-venue-page',
  templateUrl: './venue-page.component.html',
  styleUrls: ['./venue-page.component.css']
})
export class VenuePageComponent implements OnInit {

  public venue;
  public tips;
  public venueBackground:string = '';

  constructor(private route: ActivatedRoute, private fourSquareService: FoursquareService) { 
    this.route.params.subscribe(params => {
      let venueId = params['id']; 
      this.fourSquareService.getVenue(venueId).subscribe( resp =>{
        this.venue = resp['response'].venue || {};
        this.venueBackground = `${this.venue.bestPhoto.prefix}1280x600${this.venue.bestPhoto.suffix}`;
        this.tips = this.venue.tips.groups[0].items;
      })
   });
  }

  ngOnInit() {
  }

}
