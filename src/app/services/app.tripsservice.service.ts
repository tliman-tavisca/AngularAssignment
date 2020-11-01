import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Trip } from './../model/app.trip.model';
import { Store, select } from '@ngrx/store';
import { IAppTripState } from '../dataStore/state/app.state';
import { selectTripsList } from '../dataStore/selectors/app.trip.selector';

@Injectable({ providedIn: 'root' })
export class TripsService {
  private trips: Trip[];
  private hasLoaded: boolean;
  constructor(private _store: Store<IAppTripState>) {
    this.trips = new Array<Trip>();
  }

  getTripsData(): Observable<Trip[]> {
    let resp: Observable<Trip[]> = null;
    if (!this.hasLoaded) {
      this.trips.push(
        new Trip(
          1,
          'Trp001',
          'Flight',
          'Flight',
          'Delta Airlines',
          '1 Passenger, Round Trip',
          1200,
          'Confirmed',
          new Date("Oct 21, 2020 01:15:00").toDateString()
        )
      );
      this.trips.push(
        new Trip(
          2,
          'Trp002',
          'Hotel',
          'Hotel',
          'Novatel',
          '2 Adults, 3 Days 4 Nights',
          3000,
          'Confirmed',
          new Date("July 21, 2020 03:45:00").toDateString()
        )
      );
      this.trips.push(
        new Trip(3, 'Trp003', 'Car', 'Car', 'Uber', '1 Passenger', 10, 'Cancelled', new Date("Sep 21, 2020 05:34:00").toDateString())
      );
      this.trips.push(
        new Trip(4, 'Trp004', 'Activity', 'Activity', 'Google', '1 Person', 10, 'Cancelled', new Date("Aug 21, 2020 11:28:00").toDateString())
      );
      this.hasLoaded = true;
    }
    else {
      return this._store.pipe(select(selectTripsList))
    }
    resp = of(this.trips);
    return resp;
  }

  addTrip(trp: Trip): Observable<Trip[]> {
    const clone = this.deepCopyFunction(this.trips.slice());
    clone.push(trp);
    this.trips = clone;
    return of(this.trips);
  }

  removeTrip(tripID: number): Observable<Array<Trip>> {
    this.getTripsData();
    let tripIndex = this.trips.findIndex((x) => x.TripId === tripID);
    this.trips.splice(tripIndex);
    return of(this.trips);
  }

  cancelTrip(trp: Trip): Observable<Array<Trip>> {
    const clone = this.deepCopyFunction(this.trips.slice());
    clone.map((x) => {
      if (x.TripId === trp.TripId) {
        x.Status = "Cancelled";
        x.BookDate = new Date().toDateString();
      }
    }
    );
    return of(clone);
  }

  getTripDetails(tripID: number): Observable<Trip> {
    const clone = this.deepCopyFunction(this.trips.slice());
    return of(clone.find((x) => x.TripId === tripID));
  }

  deepCopyFunction = (inObject) => {
    let outObject, value, key

    if (typeof inObject !== "object" || inObject === null) {
      return inObject // Return the value if inObject is not an object
    }

    // Create an array or object to hold the values
    outObject = Array.isArray(inObject) ? [] : {}

    for (key in inObject) {
      value = inObject[key]

      // Recursively (deep) copy for nested objects, including arrays
      outObject[key] = this.deepCopyFunction(value)
    }

    return outObject
  }
}
