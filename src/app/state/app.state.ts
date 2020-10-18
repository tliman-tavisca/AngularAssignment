import { ITripState, initialTripState } from './app.trip.state';

// the initial state in store that will be used to
// read (all records )/write (create/update/delete)/select (read single)
export interface IAppTripState {
    tripState: ITripState;
}
