import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FwFileListComponent } from './fw-file-list.component';

describe('FwFileListComponent', () => {
  let component: FwFileListComponent;
  let fixture: ComponentFixture<FwFileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FwFileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FwFileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
