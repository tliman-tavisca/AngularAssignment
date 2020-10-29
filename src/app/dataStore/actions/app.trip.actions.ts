import { createAction, props } from '@ngrx/store';
import { Trip } from '../../model/app.trip.model';

export const getTrips = createAction(
    '[Trip] Get Trip'
);

export const getTripsSuccess = createAction(
    '[Trip] Get Trip Success',
    props<{ trips: Trip[] }>()
);
export const getTripById = createAction(
    '[Trip]Get Trip By Id',
    props<{ payload: number }>()
);
export const getTripByIdSuccess = createAction(
    '[Trip]Get Trip By Id Success',
    props<{ trip: Trip }>()
);
export const postTrip = createAction(
    '[Trip] Post Trip',
    props<{ trip: Trip }>()
);
export const postTripSuccess = createAction(
    '[Trip] Post Trip Success',
    props<{ trips: Trip[] }>()
);
export const putTrip = createAction(
    '[Trip] Put Trip',
    props<{ trip: Trip }>()
);
export const putTripSuccess = createAction(
    '[Trip] Put Trip Success',
    props<{ trips: Trip[] }>()
);
export const deleteTrip = createAction(
    '[Trip] Delete Trip',
    props<{ trip: Trip }>()
);
export const deleteTripSuccess = createAction(
    '[Trip] Delete Trip Success',
    props<{ trips: Trip[] }>()
);