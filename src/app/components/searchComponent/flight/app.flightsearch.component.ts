import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FlightService } from '../../../services/app.flight.service';

@Component({
    selector: 'app-flight',
    templateUrl: './app.flightsearch.component.html',
    styleUrls: ['./app.flight.component.css']
})
export class FlightComponent implements OnInit {

    @Input() model: any;
    @Output() changeName = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    serachfn() {
        this.changeName.emit();
    }

}