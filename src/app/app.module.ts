import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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

@NgModule({
  declarations: [
    AppComponent,
    MytripsComponent,
    TableDirectiveComponent,
    TripDetailsComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
