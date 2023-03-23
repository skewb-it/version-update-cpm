import { Component, OnInit , ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewBulkuploadDataComponent } from '../view-bulkupload-data/view-bulkupload-data.component';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.css']
})
export class BulkUploadComponent implements OnInit {
  @ViewChild('fileInput')
  fileInput;

  file: File | null = null;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
  }
  openDialog() {
    this.dialog.open(ViewBulkuploadDataComponent);
   }

}
