import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLoddyComponent } from './chat-loddy.component';

describe('ChatLoddyComponent', () => {
  let component: ChatLoddyComponent;
  let fixture: ComponentFixture<ChatLoddyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatLoddyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatLoddyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
