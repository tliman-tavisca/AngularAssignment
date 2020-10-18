// createSelector --> a method that will be used to define
// selectors, this selector will need the definition of the state
// schema that will be used to execute the selector
import { createSelector } from '@ngrx/store';
import { IAppTripState } from '../state/app.state';
import { ITripState } from '../state/app.trip.state';

// state subscription for defining the scehma of state used by store
const selectTrips = (state: IAppTripState) => state.tripState;
// creating selector for all data of trips from Store
export const selectTripsList = createSelector(
  selectTrips,
  (state: ITripState) => state.trips
);
// creating selector for selected trip from Store
export const selectTrip = createSelector(
  selectTrips,
  (state: ITripState) => state.selectedTrip // write query type logic (state, id)=> state.trips[i].TripcId ==id
);
