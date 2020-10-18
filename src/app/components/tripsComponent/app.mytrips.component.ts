import { Component, OnInit } from '@angular/core';
import { Trip } from './../../model/app.trip.model';
import { User } from '../../model/app.user.model';
import { AuthenticationService } from '../../services/app.authentication.service';
import { TripActions } from './../../actions/index';
import { Store, select } from '@ngrx/store';
import { IAppTripState } from '../../state/app.state';
import { selectTripsList } from '../../selectors/app.trip.selector';

@Component({
  selector: 'app-mytrips',
  templateUrl: './app.mytrips.component.html',
  styleUrls: ['./app.mytrips.component.css'],
})
export class MytripsComponent implements OnInit {
  trip: Trip;
  currentUser: User;
  // subscription for the Selector Observable
  trips$ = this._store.pipe(select(selectTripsList));

  constructor(private authenticationService: AuthenticationService, private _store: Store<IAppTripState>) {
    this.trip = new Trip(0, '', '', '', '', '', 0, '');
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit(): void {
    // this.tripService.getTrips().subscribe((trips) => (this.trips = trips));
    this._store.dispatch(TripActions.getTrips());
  }
}
