import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PyReciverComponent } from './py-reciver.component';

describe('PyReciverComponent', () => {
  let component: PyReciverComponent;
  let fixture: ComponentFixture<PyReciverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PyReciverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PyReciverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
