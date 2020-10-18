import { Component, OnInit } from '@angular/core';
import { Trip } from './../../model/app.trip.model';
import { TripsService } from './../../services/app.tripsservice.service';
import { User } from '../../model/app.user.model';
import { AuthenticationService } from '../../services/app.authentication.service';

@Component({
  selector: 'app-mytrips',
  templateUrl: './app.mytrips.component.html',
  styleUrls: ['./app.mytrips.component.css'],
})
export class MytripsComponent implements OnInit {
  trip: Trip;
  trips: Array<Trip>;
  private tripService: TripsService;
  currentUser: User;
  constructor(private authenticationService: AuthenticationService) {
    this.trip = new Trip(0, '', '', '', '', '', 0, '');
    this.trips = new Array<Trip>();
    this.tripService = new TripsService();
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    this.tripService.getTrips().subscribe((trips) => (this.trips = trips));
  }
}
