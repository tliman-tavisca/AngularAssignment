import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FlightService {
    my_data: any;
    private _jsonURL = 'assets/flightmockdata.json'

    constructor(private http: HttpClient) { }

    public getJSON(): Observable<any> {
        return this.http.get(this._jsonURL);
    }

}