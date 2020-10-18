import { Trip } from '../model/app.trip.model'

// the TripState interface type and the initial Trip state

export interface ITripState {
    trips: Trip[]; // all read operations
    trip: Trip; // write opetions (create new / update)
    selectedTrip: Trip; // query to store
};

// the intial state of data in store
export const initialTripState: ITripState = {
    trips: null,
    trip: null,
    selectedTrip: null
};
