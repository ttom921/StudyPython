import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatPostComponent } from './chat-post.component';

describe('ChatPostComponent', () => {
  let component: ChatPostComponent;
  let fixture: ComponentFixture<ChatPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
