import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { IAppTripState } from '../state/app.state';
import { TripActions } from './../actions/index';
import { TripsService } from '../../services/app.tripsservice.service';
import { selectTripsList } from '../selectors/app.trip.selector';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Trip } from '../../model/app.trip.model';

@Injectable()
export class TripsEffects {

    getTrip$ = createEffect(() => this._action$.pipe(
        ofType(TripActions.getTripById),
        map(action => action.payload),
        withLatestFrom(this._store.pipe(select(selectTripsList))), // using the seelctor
        switchMap(([id, trips]) => {
            const selectedTrip = trips.filter(trip => trip.TripId === +id)[0];
            return of(TripActions.getTripByIdSuccess({ trip: selectedTrip }));
        })
    ));
    getTrips$ = createEffect(() => this._action$.pipe(
        ofType(TripActions.getTrips),
        switchMap(() => this._serv.getTripsData()),
        switchMap((trips: Trip[]) => of(TripActions.getTripsSuccess({ trips })))
    ));


    postTrip$ = createEffect(() => this._action$.pipe(
        ofType(TripActions.postTrip),
        switchMap((param) => this._serv.addTrip(param.trip)),
        switchMap((trips: Trip[]) => of(TripActions.postTripSuccess({ trips })))
    ));


    putTrip$ = createEffect(() => this._action$.pipe(
        ofType(TripActions.putTrip),
        switchMap((param) => this._serv.cancelTrip(param.trip)),
        switchMap((trips: Trip[]) => of(TripActions.putTripSuccess({ trips })))
    ));

    deleteTrip$ = createEffect(() => this._action$.pipe(
        ofType(TripActions.deleteTrip),
        switchMap((param) => this._serv.removeTrip(param.trip.TripId)),
        switchMap((trips: Trip[]) => of(TripActions.deleteTripSuccess({ trips })))
    ));

    constructor(
        // tslint:disable-next-line: variable-name
        private _serv: TripsService,
        // tslint:disable-next-line: variable-name
        private _action$: Actions,
        // tslint:disable-next-line: variable-name
        private _store: Store<IAppTripState>
    ) { }
}
