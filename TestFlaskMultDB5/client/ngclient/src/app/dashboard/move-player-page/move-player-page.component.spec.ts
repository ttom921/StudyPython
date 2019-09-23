import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovePlayerPageComponent } from './move-player-page.component';

describe('MovePlayerPageComponent', () => {
  let component: MovePlayerPageComponent;
  let fixture: ComponentFixture<MovePlayerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovePlayerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovePlayerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
