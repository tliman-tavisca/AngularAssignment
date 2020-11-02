import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { appRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { provideMockStore } from '@ngrx/store/testing';

import { APP_BASE_HREF } from '@angular/common';
import { Trip } from 'src/app/Model/app.trip.model';
import { StoreModule } from '@ngrx/store';
import { reducer } from 'src/app/dataStore/reducers/app.trip.reducers';
import { EffectsModule } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { TripsService } from 'src/app/Services/app.tripsservice.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MytripsComponent } from '../tripsComponent/app.mytrips.component';
import { TripsEffects } from "./../../dataStore/effects/app.trip.effect";
import { User } from 'src/app/model/app.user.model';
import { ProductTypePipe } from './../../pipes/app.producttypepipe';
import { StatusPipe } from './../../pipes/app.statuspipe';
import { LoginComponent } from '../loginComponent/app.login.component';
import { RegisterComponent } from '../registerComponent/app.register.component';
import { FlightResultsComponent } from '../searchComponent/flight/app.flightresultcomponent';
import { TableDirectiveComponent } from './../../directive/app.tablecomponent.directive';
import { AlertComponent } from './../../components/alertComponent/app.alert.component';
import { FlightComponent } from './../../components/searchComponent/flight/app.flightsearch.component'
import { TripDetailsComponent } from '../tripDetailsComponent/app.tripdetails.component';
import { selectTripsList } from './../../dataStore/selectors/app.trip.selector';
import { AuthenticationService } from './../../services/app.authentication.service';

const initialState = {};

describe('MytripsComponent', () => {
  let component: MytripsComponent;
  let fixture: ComponentFixture<MytripsComponent>;
  let authService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations:
        [AppComponent,
          MytripsComponent,
          TableDirectiveComponent,
          TripDetailsComponent,
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
        CommonModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature("", reducer),
        EffectsModule.forRoot([TripsEffects])],
      providers: [
        { provide: AuthenticationService, useValue: authService },
        { provide: APP_BASE_HREF, useValue: '/' },
        provideMockStore({
          initialState,
          selectors: [{ selector: selectTripsList, value: [] }],
        }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(inject([TripsService], s => {
    fixture = TestBed.createComponent(MytripsComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    fixture.detectChanges();
  }));
  it('should create component', () => {
    expect(component.trip).toEqual({ "BasePrice": 0, "BookDate": "", "CategoryName": "", "Description": "", "ProductId": "", "ProductName": "", "Status": "", "Supplier": "", "TripId": 0 });
  });
});