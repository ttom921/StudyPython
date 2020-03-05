import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DVRListComponent } from './dvrlist.component';

describe('DVRListComponent', () => {
  let component: DVRListComponent;
  let fixture: ComponentFixture<DVRListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DVRListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DVRListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
