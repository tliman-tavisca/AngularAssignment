import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Trip } from 'src/app/model/app.trip.model';
import { TripsService } from './../../services/app.tripsservice.service';
import { ConfirmDialogService } from '../../services/app.dialog.service';
import { ConfirmDialogModule } from './../../confirm-dialog.module';

@Component({
  selector: 'app-trip-details',
  templateUrl: './app.tripdetails.component.html',
  styleUrls: ['./app.tripdetails.component.css'],
})
export class TripDetailsComponent implements OnInit {
  details: Trip;
  imageUrl: string;
  private tripService: TripsService;
  constructor(private route: ActivatedRoute, private location: Location, private confirmDialogService: ConfirmDialogService) {
    this.tripService = new TripsService();
  }

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.tripService
      .getTripDetails(id)
      .subscribe((details) => {
        this.details = details;
        this.getImageUrl();
      });
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
    this.confirmDialogService.confirmThis("Are you sure to Cancel this Trip?", function () {
      alert("Yes clicked");
    }, function () {
    })
  }
}
