import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { appRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { APP_BASE_HREF } from '@angular/common';
import { Trip } from 'src/app/Model/app.trip.model';
import { StoreModule } from '@ngrx/store';
import { reducer } from 'src/app/dataStore/reducers/app.trip.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { TripsService } from 'src/app/Services/app.tripsservice.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TripsEffects } from "./dataStore/effects/app.trip.effect";
import { User } from 'src/app/model/app.user.model';
import { ProductTypePipe } from './pipes/app.producttypepipe';
import { StatusPipe } from './pipes/app.statuspipe';
import { LoginComponent } from './components/loginComponent/app.login.component';
import { RegisterComponent } from './components/registerComponent/app.register.component';
import { FlightResultsComponent } from './components/searchComponent/flight/app.flightresultcomponent';
import { TableDirectiveComponent } from './components/../directive/app.tablecomponent.directive';
import { AlertComponent } from './components/alertComponent/app.alert.component';
import { FlightComponent } from './components/searchComponent/flight/app.flightsearch.component'
import { MytripsComponent } from './components/tripsComponent/app.mytrips.component'
import { TripDetailsComponent } from './components/tripDetailsComponent/app.tripdetails.component'
import { selectTripsList } from './dataStore/selectors/app.trip.selector';
import { AuthenticationService } from './services/app.authentication.service';

const initialState = {};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
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
        CommonModule, ReactiveFormsModule, StoreModule.forRoot({})
        , StoreModule.forFeature("", reducer),
        EffectsModule.forRoot([TripsEffects])],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        { provide: AuthenticationService, useValue: authService },
        provideMockStore({
          initialState,
          selectors: [{ selector: selectTripsList, value: null }],
        }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(inject([AuthenticationService], s => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    let user = new User();
    user.firstName = "Test";
    component.currentUser = user;
    authService = TestBed.inject(AuthenticationService);
    fixture.detectChanges();
  }));

  it('should create component', () => {
    expect(component.currentUser).toBeTruthy();
  });

});