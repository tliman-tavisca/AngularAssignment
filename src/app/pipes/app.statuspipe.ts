import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) { }
  transform(content) {
    var style = "";
    switch (content.toLocaleLowerCase().toString()) {
      case "confirmed":
        style = content.replace(content, " <span style='color: green; font-weight:500 '>" + content + " </span>");
        break;
      case "cancelled":
        style = content.replace(content, " <span style='color: red'>" + content + " </span>");
        break;
      default:
        style = content.replace(content, " <span style='color: black'>" + content + " </span>");
        break;
    }
    return this.sanitized.bypassSecurityTrustHtml(style);;
  }
}