import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabledirective-component',
  templateUrl: './app.tablecomponent.view.html',
  styles: ['td { background: white; }']
})
export class TableDirectiveComponent implements OnInit {
  private dataSource: Array<any>;
  headers: Array<string>;
  @Output()
  notify: EventEmitter<any>;
  constructor(private router: Router) {
    this.dataSource = new Array<any>();
    this.headers = new Array<string>();
    this.notify = new EventEmitter<any>();
  }

  ngOnInit(): void { }

  @Input()
  set DataSource(val: Array<any>) {
    if (val.length > 0) {
      this.dataSource = val;
      for (const p of Object.keys(this.dataSource[0])) {
        this.headers.push(p);
      }
    } else {
      this.dataSource = new Array<any>();
    }
  }
  get DataSource(): Array<any> {
    return this.dataSource;
  }

  rowClick(rec: any): void {
    this.router.navigate(['/detail/', rec.TripId]);
  }
}
