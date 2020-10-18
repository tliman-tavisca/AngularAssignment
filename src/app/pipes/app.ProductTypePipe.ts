import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'producttype',
})
export class ProductTypePipe implements PipeTransform {
  transform(content) {
    var imageurl = "";
    switch (content.toLocaleLowerCase().toString()) {
      case "flight":
        imageurl = "../../../assets/flight1_tiny.jpg"
        break;
      case "hotel":
        imageurl = "../../../assets/hotel_tiny.jpg"
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

    return ` <img src=${imageurl} alt="Itenary" width="50px" /> `;
  }
}