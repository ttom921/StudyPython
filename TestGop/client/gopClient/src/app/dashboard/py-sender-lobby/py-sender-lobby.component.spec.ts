import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PySenderLobbyComponent } from './py-sender-lobby.component';

describe('PySenderLobbyComponent', () => {
  let component: PySenderLobbyComponent;
  let fixture: ComponentFixture<PySenderLobbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PySenderLobbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PySenderLobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
