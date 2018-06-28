import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'; 


@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.css']
})
export class VenueComponent implements OnInit {
  @Input() venue;
  @Input() venuePhoto;
  constructor(private router:Router) { }

  ngOnInit() {
  }
  openVenue(venueId){
    this.router.navigate(['/venue', venueId]);
  }

}
