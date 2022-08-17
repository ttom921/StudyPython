import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WsroomComponent } from './wsroom.component';

describe('WsroomComponent', () => {
  let component: WsroomComponent;
  let fixture: ComponentFixture<WsroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WsroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WsroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
