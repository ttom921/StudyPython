import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PyManagerComponent } from './py-manager.component';

describe('PyManagerComponent', () => {
  let component: PyManagerComponent;
  let fixture: ComponentFixture<PyManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PyManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PyManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
