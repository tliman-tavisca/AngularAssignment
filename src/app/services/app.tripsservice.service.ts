import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Trip } from './../model/app.trip.model';

@Injectable({ providedIn: 'root' })
export class TripsService {
  private trips: Trip[];

  constructor() {
    this.trips = new Array<Trip>();
  }

  getTripsData(): Observable<Trip[]> {
    let resp: Observable<Trip[]> = null;


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
    resp = of(this.trips);
    return resp;
  }

  addTrip(trp: Trip): Observable<Trip[]> {
    this.getTripsData();
    this.trips.push(trp);
    return of(this.trips);
  }

  removeTrip(tripID: number): Observable<Array<Trip>> {
    this.getTripsData();
    let tripIndex = this.trips.findIndex((x) => x.TripId === tripID);
    this.trips.splice(tripIndex);
    return of(this.trips);
  }

  getTripDetails(tripID: number): Observable<Trip> {
    this.getTripsData();
    return of(this.trips.find((x) => x.TripId === tripID));
  }
}
