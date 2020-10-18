import { Injectable } from '@angular/core';
// of --> the method, monitor the execution of
// the Observale thorugh effect
import { of } from 'rxjs';
// Store --> reference of the store that will be impacted
// select --> Used to execute a 'selector' (?) on store using effect
import { Store, select } from '@ngrx/store';
// importing all required objects for defining and executing effects
// Actions --> the actions those are input and output for
// effects
// ofType --> Current action name for which the effect will be executed
// createEffect --> creating the effect definition
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
// IAppTripState --> Initial State Schema for the store
// that will be affected by the Effects after execution
import { IAppTripState } from '../state/app.state';
// importing all actions
import { TripActions } from './../actions/index';
// importing HTTPService that contains all Async Calls
import { TripsService } from '../services/app.tripsservice.service';
// the selector that will be used by effect to read data from store
import { selectTripsList } from '../selectors/app.trip.selector';
// switchMap --> Reda data from Observable and Process it
// map --> Map the NGRX action to the payload
// and help switchMap to read data for processing
// withLatestFrom --> Used to select specific amount / type of data
// from observale like 'select' query
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Trip } from '../model/app.trip.model';

@Injectable()
export class TripsEffects {
    // if any declaration is of the type promise /observale for async
    // operations are used then postfix-it using $ sign
    // _action$.pipe() method that will be executed
    // for the action being dispatched
    getTrip$ = createEffect(() => this._action$.pipe(
        ofType(TripActions.getTripById),
        map(action => action.payload),
        // execute the selectTripsList selector using 'select' method
        // on the store
        withLatestFrom(this._store.pipe(select(selectTripsList))), // using the seelctor
        switchMap(([id, trips]) => {
            const selectedTrip = trips.filter(trip => trip.TripId === +id)[0];
            console.log(`in effect ${id} ${JSON.stringify(selectedTrip)}`);
            return of(TripActions.getTripByIdSuccess({ trip: selectedTrip }));
        })
    ));
    getTrips$ = createEffect(() => this._action$.pipe(
        ofType(TripActions.getTrips), // if store dispatch the getTrips action then
        switchMap(() => this._serv.getTripsData()), // subscribe to the getData() method of NG Service
        // subscribe to the observable, process it and return the succes action
        switchMap((trips: Trip[]) => of(TripActions.getTripsSuccess({ trips })))
    ));


    postTrip$ = createEffect(() => this._action$.pipe(
        ofType(TripActions.postTrip),
        switchMap((param) => this._serv.addTrip(param.trip)),
        // subscribe to the observable, process it and return the succes action
        switchMap((trips: Trip[]) => of(TripActions.postTripSuccess({ trips })))
    ));


    putTrip$ = createEffect(() => this._action$.pipe(
        ofType(TripActions.putTrip),
        switchMap((param) => this._serv.addTrip(param.trip)),
        switchMap((trips: Trip[]) => of(TripActions.putTripSuccess({ trips })))
    ));

    deleteTrip$ = createEffect(() => this._action$.pipe(
        ofType(TripActions.deleteTrip),
        switchMap((param) => this._serv.removeTrip(param.trip.TripId)),
        // on true return from the service
        // execute the selector on store get the Trip that is deleted using
        // selector from from store and pass it as payload to the
        // success method
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
