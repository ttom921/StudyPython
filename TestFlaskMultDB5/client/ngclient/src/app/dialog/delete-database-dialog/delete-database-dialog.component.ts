import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-database-dialog',
  templateUrl: './delete-database-dialog.component.html',
  styleUrls: ['./delete-database-dialog.component.scss']
})
export class DeleteDatabaseDialogComponent implements OnInit {
  get dbkey() {
    return this.data.dbkey;
  }
  get dburl() {
    return this.data.dburl;
  }
  constructor(
    private dialogRef: MatDialogRef<DeleteDatabaseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
  }
  public confirm() {
    this.dialogRef.close('confirm');
  }

}
