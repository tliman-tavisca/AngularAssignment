import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { FlightService } from '../../../services/app.flight.service'

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

    constructor(private apiService: FlightService) { }

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
        console.log("model:::", this.model)
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
                console.log(data)
            })
    }

}