import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMaterialComponent } from './ng-material.component';

describe('NgMaterialComponent', () => {
  let component: NgMaterialComponent;
  let fixture: ComponentFixture<NgMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
