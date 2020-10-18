// createReducer--> Function to define Reducer with parameters
// 1st parameter is the state object schema taht will be updated
// 2nd parametyer on() function. This function listen to the
// action that is dispatched from the Action Subscriber aka
// store subscriber, the second parameter to on() is
// the initial state object taht will be updated by the final state value
// IMP*** --> Do not with any logc in reducer functions

import { createReducer, on } from '@ngrx/store';
import { TripActions } from './../actions/index';
import { initialTripState } from './../state/app.trip.state';
// responsible to monitor dispatched actions from View aka store subscribed by view
// the action invocation is managed using on() method
export const reducer = createReducer(
    initialTripState, // intial state of the store
    on(TripActions.getTripsSuccess, (state, { trips }) => ({
        ...state,  // state.create(trips)
        trips
    })),
    on(TripActions.getTripByIdSuccess, (state, { trip }) => ({
        ...state,
        selectedTrip: trip
    })),
    on(TripActions.postTripSuccess, (state, { trips }) => ({
        ...state,
        trips
    })),
    on(TripActions.putTripSuccess, (state, { trips }) => ({
        ...state,
        trips
    })),
    on(TripActions.deleteTripSuccess, (state, { trips }) => {
        state.trips.forEach((p, index) => {
            trips.forEach((r, index) => {
                if (p.TripId === r.TripId) {
                    state.trips.splice(index, 1);
                }
            });
        });

        return {
            ...state,
            trips
        }
    }
    )
);
