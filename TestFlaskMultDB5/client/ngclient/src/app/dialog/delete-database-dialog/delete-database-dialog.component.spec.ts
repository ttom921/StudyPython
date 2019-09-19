import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDatabaseDialogComponent } from './delete-database-dialog.component';

describe('DeleteDatabaseDialogComponent', () => {
  let component: DeleteDatabaseDialogComponent;
  let fixture: ComponentFixture<DeleteDatabaseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDatabaseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDatabaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
