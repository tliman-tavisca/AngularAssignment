import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let dom: any;
  let fixture: ComponentFixture<AppComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [AppComponent],
  //     imports: [RouterTestingModule],
  //     schemas: [CUSTOM_ELEMENTS_SCHEMA],
  //   });
  //   fixture = TestBed.createComponent(AppComponent);
  //   component = fixture.componentInstance;
  //   dom = fixture.nativeElement;
  // }));

  // test('should exist', () => {
  //   expect(component).toBeDefined();
  // });

  // test('should have a default name', () => {
  //   expect(component.currentUser.username).toBe('');
  // });
});