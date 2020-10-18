import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MytripsComponent } from '../app/components/tripsComponent/app.mytrips.component';
import { TripDetailsComponent } from '../app/components/tripDetailsComponent/app.tripdetails.component';
import { LoginComponent } from './components/loginComponent/app.login.component';
import { RegisterComponent } from './components/registerComponent/app.register.component';
import { Authenticator } from './infrastructure/authenticator';
import { FlightResultsComponent } from './components/searchComponent/flight/app.flightresultcomponent';

const routes: Routes = [
  { path: '', component: MytripsComponent, canActivate: [Authenticator] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'mytrips', component: MytripsComponent },
  { path: 'detail/:id', component: TripDetailsComponent },
  { path: 'flight', component: FlightResultsComponent },
  { path: 'car', component: FlightResultsComponent },
  { path: 'hotel', component: FlightResultsComponent },
  { path: 'activity', component: FlightResultsComponent },
];

export const appRoutingModule = RouterModule.forRoot(routes);
