import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Trip } from 'src/app/model/app.trip.model';
import { ConfirmDialogService } from '../../services/app.dialog.service';
import { TripActions } from './../../dataStore/actions/index';
import { Store, select } from '@ngrx/store';
import { IAppTripState } from '../../dataStore/state/app.state';
import { AlertService } from '../../services/app.alert.service';
import { selectTrip } from '../../dataStore/selectors/app.trip.selector';

@Component({
  selector: 'app-trip-details',
  templateUrl: './app.tripdetails.component.html',
  styleUrls: ['./app.tripdetails.component.css'],
})
export class TripDetailsComponent implements OnInit {
  details: Trip;
  imageUrl: string;
  trip$ = this._store.pipe(select(selectTrip));

  constructor(private route: ActivatedRoute,
    private location: Location,
    private confirmDialogService: ConfirmDialogService,
    private _store: Store<IAppTripState>,
    private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this._store.dispatch(TripActions.getTripById({ payload: id }));
    this._store.pipe(select(selectTrip)).subscribe((details) => {
      this.details = details;
      this.getImageUrl();
    });;
  }

  goBack(): void {
    this.location.back();
  }

  getImageUrl() {
    var imageurl = "";
    switch (this.details.CategoryName.toLocaleLowerCase().toString()) {
      case "flight":
        imageurl = "../../../assets/flights.jpg"
        break;
      case "hotel":
        imageurl = "../../../assets/hotel.jpg"
        break;
      case "car":
        imageurl = "../../../assets/car.jfif"
        break;
      case "activity":
        imageurl = "../../../assets/activity.jpg"
        break;
      default:
        break;
    }
    this.imageUrl = imageurl;
  }

  showDialog() {
    this.confirmDialogService.confirmThis("Are you sure to Cancel this Trip?",
      () => this.cancelTrip(),
      function () { })
  }

  cancelTrip(): void {
    this._store.dispatch(TripActions.putTrip({ trip: this.details }));
    this.alertService.success("Your Trip is Cancelled!! Contact Customer care for further details..");
    this.ngOnInit();
  }
}
