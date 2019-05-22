import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PySenderComponent } from './py-sender.component';

describe('PySenderComponent', () => {
  let component: PySenderComponent;
  let fixture: ComponentFixture<PySenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PySenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PySenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
