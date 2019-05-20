import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendchannelComponent } from './sendchannel.component';

describe('SendchannelComponent', () => {
  let component: SendchannelComponent;
  let fixture: ComponentFixture<SendchannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendchannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendchannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
