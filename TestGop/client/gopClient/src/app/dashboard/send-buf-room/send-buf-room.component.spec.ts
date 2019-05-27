import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendBufRoomComponent } from './send-buf-room.component';

describe('SendBufRoomComponent', () => {
  let component: SendBufRoomComponent;
  let fixture: ComponentFixture<SendBufRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendBufRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendBufRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
