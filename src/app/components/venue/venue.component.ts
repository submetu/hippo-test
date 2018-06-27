import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-venue',
  templateUrl: './venue.component.html',
  styleUrls: ['./venue.component.css']
})
export class VenueComponent implements OnInit {
  @Input() venue;
  constructor() { }

  ngOnInit() {
  }

}
