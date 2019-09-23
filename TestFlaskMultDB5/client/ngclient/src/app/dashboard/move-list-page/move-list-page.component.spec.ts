import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveListPageComponent } from './move-list-page.component';

describe('MoveListPageComponent', () => {
  let component: MoveListPageComponent;
  let fixture: ComponentFixture<MoveListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
