import { createReducer, on } from '@ngrx/store';
import { TripActions } from './../actions/index';
import { initialTripState } from './../state/app.trip.state';

export const reducer = createReducer(
    initialTripState, // intial state of the store
    on(TripActions.getTripsSuccess, (state, { trips }) => ({
        ...state,
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
