import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ViewBulkuploadDataComponent } from '../view-bulkupload-data/view-bulkupload-data.component';
import { FileUploadConfigModel, FileUploadDataModel } from './file-upload-model';
import { MatTableDataSource } from '@angular/material/table';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { ValidationService } from 'src/app/services/validation.service';
import { ErrorDialogService } from 'src/app/services/error.dialog.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent extends WidgetComponentBase implements OnInit {
  @Input() dataModel: FileUploadDataModel;
  @Input() configModel: FileUploadConfigModel;
  file: File | null = null;
  formDataFromParent: FormData
  uploadedFiles: any[] = [];
  selectedFiles: any[] = [];
  progressValue: any = 0;

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    private _notificationService: NotificationService,
    private _errorDialogService: ErrorDialogService,
    private _validationService: ValidationService) {
    super(_serverApi, _validationService);
  }

  ngOnInit(): void {
    this.wgOnInit();
  }

  setFieldData() {

  }

  getControlData() {

  }

  convertData(response: any) {

  }

  setMode(responseDataModel: any) {

  }

  setValue(responseDataModel: any) {

  }

  onSelect(event: any) {
    if(((event.currentFiles[0].size/1024)/1024)>10){
      this._errorDialogService.openDialog("", "The file you are trying to upload is larger than the file size expected by Street Manager. Please ensure that you file size is less than 10MB");
    this.onClear();
    }

    else
    {
      for (const file of event.files) {
        this.selectedFiles.push(file);
      }
    }


  
  }

  onRemove(event: any) {
    this.selectedFiles = this.selectedFiles.filter(f => {
      return f.lastModified !== event.lastModified;
    });
    this.uploadedFiles = [];
  }

  onClear() {
    this.selectedFiles = [];
  }

  // Callback to invoke when file upload is complete.
  onUpload(event: any) {
    if (event) {
      for (const file of event.files) {
        this.uploadedFiles.push(file);
      }
    }
    this.selectedFiles = [];
    this._notificationService.success('File Uploaded');
    this.uploadedFiles = [];
    this.progressValue = 0;
  }

  uploadHandler(event: any) {
    let data: any = new Object()
    data.fileData = event;
    this.emitEvent("uploadHandler", data);
    this.selectedFiles = [];
  }
}
