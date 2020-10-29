import { Trip } from '../../model/app.trip.model'

export interface ITripState {
    trips: Trip[];
    trip: Trip;
    selectedTrip: Trip;
};

export const initialTripState: ITripState = {
    trips: null,
    trip: null,
    selectedTrip: null
};
