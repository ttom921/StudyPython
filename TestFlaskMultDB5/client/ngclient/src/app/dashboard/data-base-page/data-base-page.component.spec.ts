import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBasePageComponent } from './data-base-page.component';

describe('DataBasePageComponent', () => {
  let component: DataBasePageComponent;
  let fixture: ComponentFixture<DataBasePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataBasePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataBasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
