import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { appRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MytripsComponent } from './components/tripsComponent/app.mytrips.component';
import { TableDirectiveComponent } from './directive/app.tablecomponent.directive';
import { TripDetailsComponent } from './components/tripDetailsComponent/app.tripdetails.component';
import { LoginComponent } from './components/loginComponent/app.login.component';
import { RegisterComponent } from './components/registerComponent/app.register.component';
import { AlertComponent } from './components/alertComponent/app.alert.component';
import { fakeBackendProvider } from './infrastructure/fake-backend';
import { JwtTokenInterceptor } from './infrastructure/jwtToken.interceptor';
import { ErrorInterceptor } from './infrastructure/error.interceptor';
import { ProductTypePipe } from './pipes/app.producttypepipe';
import { StatusPipe } from './pipes/app.statuspipe';

import { ConfirmDialogModule } from './confirm-dialog.module';
import { FlightComponent } from './components/searchComponent/flight/app.flightsearch.component'
import { FlightService } from './services/app.flight.service';
import { FlightResultsComponent } from './components/searchComponent/flight/app.flightresultcomponent'

import { StoreModule } from '@ngrx/store';
import { mainReducers } from './dataStore/reducers/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { TripsEffects } from './dataStore/effects/app.trip.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent,
    MytripsComponent,
    TableDirectiveComponent,
    TripDetailsComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    ProductTypePipe,
    FlightComponent,
    FlightResultsComponent,
    StatusPipe
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    StoreModule.forRoot(mainReducers),
    // All Async operations are initialized at app level
    // using EffectsModule
    EffectsModule.forRoot([TripsEffects]),
    appRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    ConfirmDialogModule,
    FormsModule,
    StoreDevtoolsModule.instrument({
      name: 'My NgRx App',
      logOnly: environment.production
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,
    FlightService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
