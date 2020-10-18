import { ActionReducerMap } from '@ngrx/store';
import { IAppTripState } from '../state/app.state';
import { reducer } from './app.trip.reducers';

// facade for reducers to that the Reducer knows what state from store
// will be monitored
export const mainReducers: ActionReducerMap<IAppTripState, any> = {
  tripState: reducer
};
