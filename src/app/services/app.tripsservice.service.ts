import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Trip } from './../model/app.trip.model';

@Injectable({ providedIn: 'root' })
export class TripsService {
  private trips: Trip[];

  constructor() {
    this.trips = new Array<Trip>();
  }

  getTrips(): Observable<Trip[]> {
    this.trips.push(
      new Trip(
        1,
        'Trp001',
        'Flight',
        'Flight',
        'Delta Airlines',
        'This trip is booked on Date: 3-Dec-2020, 1 Passenger, Round Trip',
        120000,
        'Confirmed'
      )
    );
    this.trips.push(
      new Trip(
        2,
        'Trp002',
        'Hotel',
        'Hotel',
        'Novatel',
        'This trip is booked on Date: 3-Dec-2020, 1 Passenger, Round Trip',
        3000,
        'Confirmed'
      )
    );
    this.trips.push(
      new Trip(3, 'Trp003', 'Car', 'Car', 'Uber', 'This trip is booked on Date: 3-Dec-2020, 1 Passenger, Round Trip', 10, 'Cancelled')
    );
    this.trips.push(
      new Trip(4, 'Trp004', 'Activity', 'Activity', 'Uber', 'This trip is booked on Date: 26-Dec-2020, 1 Passenger, Round Trip', 10, 'Cancelled')
    );
    return of(this.trips);
  }

  addTrip(trp: Trip): Observable<Trip[]> {
    this.getTrips();
    this.trips.push(trp);
    return of(this.trips);
  }

  removeTrip(tripID: number): Observable<Array<Trip>> {
    this.getTrips();
    let productIndex = this.trips.findIndex((x) => x.TripId === tripID);
    this.trips.splice(productIndex);
    return of(this.trips);
  }

  getTripDetails(tripID: number): Observable<Trip> {
    this.getTrips();
    return of(this.trips.find((x) => x.TripId === tripID));
  }
}
