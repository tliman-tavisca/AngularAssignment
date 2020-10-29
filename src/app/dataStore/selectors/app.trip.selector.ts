import { createSelector } from '@ngrx/store';
import { IAppTripState } from '../state/app.state';
import { ITripState } from '../state/app.trip.state';

const selectTrips = (state: IAppTripState) => state.tripState;

export const selectTripsList = createSelector(
  selectTrips,
  (state: ITripState) => state.trips
);

export const selectTrip = createSelector(
  selectTrips,
  (state: ITripState) => state.selectedTrip
);
