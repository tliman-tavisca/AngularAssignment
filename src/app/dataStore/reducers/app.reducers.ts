import { ActionReducerMap } from '@ngrx/store';
import { IAppTripState } from '../state/app.state';
import { reducer } from './app.trip.reducers';

export const mainReducers: ActionReducerMap<IAppTripState, any> = {
  tripState: reducer
};
