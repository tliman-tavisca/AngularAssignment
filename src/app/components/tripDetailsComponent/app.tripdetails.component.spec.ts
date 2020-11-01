import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { TripDetailsComponent } from './app.tripdetails.component';
import { Router } from '@angular/router';
import { selectTripsList } from './../../dataStore/selectors/app.trip.selector';
import { Trip } from 'src/app/model/app.trip.model';

const tripMockData = new Array<Trip>();
const initialState = {};

class MockRouter {
  navigateByUrl(url: string) {
    return url;
  }
}

describe('TripDetailsComponent', () => {
  let component: TripDetailsComponent;
  let fixture: ComponentFixture<TripDetailsComponent>;
  let mockStore: MockStore;
  let router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TripDetailsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [],
      providers: [
        { provide: Router, useClass: MockRouter },
        provideMockStore({
          initialState,
          selectors: [{ selector: selectTripsList, value: null }],
        }),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    window.scrollTo = jest.fn();
    fixture = TestBed.createComponent(TripDetailsComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(selectTripsList, tripMockData);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
