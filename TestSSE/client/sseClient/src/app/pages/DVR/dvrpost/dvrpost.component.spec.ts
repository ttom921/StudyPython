import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DVRPostComponent } from './dvrpost.component';

describe('DVRPostComponent', () => {
  let component: DVRPostComponent;
  let fixture: ComponentFixture<DVRPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DVRPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DVRPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
