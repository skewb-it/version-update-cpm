import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PERMIT_ACTIONS_CONFIG } from 'src/app/constants/db.constants';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { AppRepoService } from 'src/app/services/app-repo.service';
import { SaveFileService } from 'src/app/services/save-file.service';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { DataHelper } from 'src/app/utility/data.helper';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { PermitImagesAndFilesConfigModel, PermitImagesAndFilesDetailsModel, PermitImagesAndFilesModel } from './permit-images-and-files-tab.model';

@Component({
  selector: 'app-permit-images-and-files-tab',
  templateUrl: './permit-images-and-files-tab.component.html',
  styleUrls: ['./permit-images-and-files-tab.component.css']
})
export class PermitImagesAndFilesTabComponent extends WidgetComponentBase implements OnInit {
  @Input() dataModel: PermitImagesAndFilesModel;
  @Input() configModel: PermitImagesAndFilesConfigModel;
  applicationId: number;
  PERMIT_ACTIONS_CONFIG = PERMIT_ACTIONS_CONFIG;
  constructor(private _serverApi: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    private _saveFileService: SaveFileService,
    private _router: Router,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private _validationService: ValidationService,
    private _appRepoService: AppRepoService) {
    super(_serverApi, _validationService);
  }

  ngOnInit(): void {
    this.applicationId = this.dataModel.globalParameters.get('applicationId');
    this.wgOnInit();
  }

  getControlData() {
    //this.applicationId = this.dataModel.globalParameters.get('applicationId');
    // INFO: ServerAPI
    let url = `/api/v1/applications/${this.dataModel.globalParameters.get('applicationId')}/files`;
    return this.wgAPIMethodGet(url);
  }

  convertData(response: any) {
    let items: any[] = []
    if (response) {
      response.forEach((element: PermitImagesAndFilesDetailsModel) => {
        let item: PermitImagesAndFilesDetailsModel = new PermitImagesAndFilesDetailsModel();
        item.fileId = element.fileId;
        item.workId = element.workId;
        item.applicationId = element.applicationId;
        item.fileRefId = element.fileRefId;
        item.objectRefId = element.objectRefId;
        item.filename = element.filename;
        item.title = DataHelper.removeExtensionFromName(element.filename);
        item.fileType = element.fileType;
        item.fileLinked = element.fileLinked;
        item.createdBy = element.createdBy;
        item.createDate = element.createDate;
        item.fileSize = DataHelper.FormatSize(element.fileSize);
        item.extension = DataHelper.getFileExetension(element.filename);

        item.isImage = DataHelper.isImage(item.extension);

        item.iconName = item.isImage ? 'image' : 'text_snippet';
        if (item.isImage) {
          this.getImage(item.fileId).then((response: any) => {
            item.imageBlob = response;
            let unsafeImageUrl = URL.createObjectURL(item.imageBlob);
            item.imageSrc = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
          });
        }
        items.push(item);
      });
    }
    // this.dataModel.data = items;
    return items;
  }

  setValue(responseDataModel: any[]) {
    this.dataModel.data = responseDataModel;
  }

  setFieldData() {

  }

  setMode(responseDataModel: any) {

  }

  getImage(fileId) {
    return new Promise((resolve, reject) => {
      this._serverApi.download(`/api/v1/applications/${this.dataModel.globalParameters.get('applicationId')}/files/${fileId}`).subscribe(
        response => {
          try {
            if (response) {
              resolve(response)
            }
            reject("error")
          } catch (e) {
          }
        }, error => {
          reject(error)
        }
      );
    });
  }

  getFileApiData(fileId, filename) {
    this._serverApi.download(`/api/v1/applications/${this.dataModel.globalParameters.get('applicationId')}/files/${fileId}`).subscribe(
      response => {
        try {
          if (response) {
            this._saveFileService.saveFile(response, filename)
          }
        } catch (e) {
        }
      }, error => {
      }
    );
  }

  openFileUpload() {
    let data: any = new Object()
    this.emitEvent("openDialog", data)
  }

  hasPermitActionPermission(actionName) {
  return  this._appRepoHelperService.hasPermitActionPermission(actionName)
  }

}
