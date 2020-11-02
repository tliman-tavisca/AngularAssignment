import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { appRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Location } from "@angular/common";

import { APP_BASE_HREF } from '@angular/common';
import { Trip } from 'src/app/Model/app.trip.model';
import { StoreModule } from '@ngrx/store';
import { reducer } from 'src/app/dataStore/reducers/app.trip.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { of } from 'rxjs';
import { TripsService } from 'src/app/Services/app.tripsservice.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AlertComponent } from '../alertComponent/app.alert.component';
import { TripsEffects } from "./../../dataStore/effects/app.trip.effect";
import { User } from 'src/app/model/app.user.model';
import { ProductTypePipe } from './../../pipes/app.producttypepipe';
import { StatusPipe } from './../../pipes/app.statuspipe';
import { MytripsComponent } from '../tripsComponent/app.mytrips.component';
import { LoginComponent } from '../loginComponent/app.login.component';
import { RegisterComponent } from '../registerComponent/app.register.component';
import { FlightResultsComponent } from '../searchComponent/flight/app.flightresultcomponent';
import { TableDirectiveComponent } from './../../directive/app.tablecomponent.directive';
import { FlightComponent } from './../../components/searchComponent/flight/app.flightsearch.component'
import { selectTripsList } from './../../dataStore/selectors/app.trip.selector';
import { selectTrip } from './../../dataStore/selectors/app.trip.selector';
import { AlertService } from '../../services/app.alert.service';
import { TripDetailsComponent } from '../tripDetailsComponent/app.tripdetails.component';

const tripMockData = new Array<Trip>();
const initialState = {};

describe('AlertComponent', () => {
    let component: AlertComponent;
    let fixture: ComponentFixture<AlertComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations:
                [AppComponent,
                    MytripsComponent,
                    TableDirectiveComponent,
                    TripDetailsComponent,
                    AlertComponent,
                    LoginComponent,
                    RegisterComponent,
                    AlertComponent,
                    ProductTypePipe,
                    FlightResultsComponent,
                    FlightComponent,
                    StatusPipe],
            imports: [BrowserModule,
                appRoutingModule,
                FormsModule,
                HttpClientModule,
                CommonModule, ReactiveFormsModule, StoreModule.forRoot({})
                , StoreModule.forFeature("", reducer),
                EffectsModule.forRoot([TripsEffects])],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' },
                provideMockStore({
                    initialState,
                    selectors:
                        [{
                            selector: selectTripsList, value: [{
                                "BasePrice": 10, "BookDate": "", "CategoryName": "Flight",
                                "Description": "", "ProductId": "", "ProductName": "", "Status": "",
                                "Supplier": "", "TripId": 1
                            }]
                        },
                        {
                            selector: selectTrip, value: {
                                "BasePrice": 10, "BookDate": "", "CategoryName": "Flight",
                                "Description": "", "ProductId": "", "ProductName": "", "Status": "",
                                "Supplier": "", "TripId": 1
                            }
                        }],
                }),
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(inject([AlertService], s => {
        fixture = TestBed.createComponent(AlertComponent);
        component = fixture.componentInstance;

        component.message = { type: "success", message: "Test" };

        fixture.detectChanges();
    }));
    it('should create component', () => {
        expect(component.message.message).toEqual("Test");
    });
});