import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharRoomComponent } from './char-room.component';

describe('CharRoomComponent', () => {
  let component: CharRoomComponent;
  let fixture: ComponentFixture<CharRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
