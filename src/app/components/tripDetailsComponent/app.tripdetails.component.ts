import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Trip } from 'src/app/model/app.trip.model';
import { TripsService } from './../../services/app.tripsservice.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './app.tripdetails.component.html',
  styleUrls: ['./app.tripdetails.component.css'],
})
export class TripDetailsComponent implements OnInit {
  details: Trip;
  private tripService: TripsService;
  constructor(private route: ActivatedRoute, private location: Location) {
    this.tripService = new TripsService();
  }

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.tripService
      .getTripDetails(id)
      .subscribe((details) => (this.details = details));
  }

  goBack(): void {
    this.location.back();
  }
}
