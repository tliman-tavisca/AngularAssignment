import { Component, OnInit } from '@angular/core';
import { FlightService } from '../../../services/app.flight.service'
import { Store, select } from '@ngrx/store';
import { IAppTripState } from '../../../dataStore/state/app.state';
import { TripActions } from './../../../dataStore/actions/index';
import { Trip } from 'src/app/model/app.trip.model';
import { selectTripsList } from '../../../dataStore/selectors/app.trip.selector';
import { Router } from '@angular/router';

@Component({
    selector: 'app-flightresult',
    templateUrl: './app.flightresult.component.html',
    styleUrls: ['./app.flight.component.css']
})
export class FlightResultsComponent implements OnInit {

    flightData: any = []
    name = 'Angular';
    model: any = {};
    fliteredData: any = []
    toOrginCity: string = ''
    fromDestCity: string = ''
    dateSelectedTo: any = new Date()
    dateSelectedFrom: any = new Date()
    destination2: string;

    constructor(private apiService: FlightService,
        private _store: Store<IAppTripState>,
        private router: Router) { }

    process(date: any) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    onchangeName() {
        for (var i in this.flightData) {
            if (this.flightData[i]['Origin1'] == this.model['originCity'] &&
                this.flightData[i]['Destination1'] == this.model['destCity'] &&
                this.flightData[i]['Cabin1'] == this.model['passenger'] &&
                (this.process(new Date(this.flightData[i]['ArrivalDate1'])) == this.model.dateArrival) &&
                (this.process(new Date(this.flightData[i]['DepartureDate1'])) == this.model.dateDepature)) {
                this.fliteredData.push(this.flightData[i])
                this.destination2 = this.flightData[i]['Destination2']

            }
        }
        this.toOrginCity = this.model['originCity']
        this.fromDestCity = this.model['destCity']
        this.flightData = this.fliteredData
        this.dateSelectedTo = this.model.dateArrival
        this.dateSelectedFrom = this.model.dateDepature
    }

    ngOnInit() {
        this.apiService.getJSON().subscribe(
            data => {
                this.flightData = data
            })
    }

    book(rec: any): void {
        let lastTripId;
        this._store.pipe(select(selectTripsList)).subscribe(
            (details) => {
                lastTripId = details[details.length - 1].TripId + 1;
            }
        )
        const details = new Trip(lastTripId, rec.FlightNumber1, 'Flight', 'Flight', 'Delta', rec.Adult + ' Pessenger, ' + rec.TripType + ', ' + rec.Destination1 + ' To ' + rec.Destination2, rec.DisplayedPrice, 'Confirmed', new Date().toDateString());
        this._store.dispatch(TripActions.postTrip({ trip: details }));
        this.router.navigate(['/detail/', details.TripId]);
    }
}