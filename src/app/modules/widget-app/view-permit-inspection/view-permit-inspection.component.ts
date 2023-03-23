import { Component, OnInit, Input } from '@angular/core';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { SaveFileService } from 'src/app/services/save-file.service';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';
import { ViewPermitInspectionDataModel, ViewPermitInspectionConfigModel } from './view-permit-inspection.model';
import { MASTER_DATA_DOMAIN } from 'src/app/constants/app-repo.constants';

@Component({
  selector: 'app-view-permit-inspection',
  templateUrl: './view-permit-inspection.component.html',
  styleUrls: ['./view-permit-inspection.component.css']
})
export class ViewPermitInspectionComponent extends WidgetComponentBase implements OnInit {

  @Input() dataModel: ViewPermitInspectionDataModel;
  @Input() configModel: ViewPermitInspectionConfigModel;

  actionList: any[] = [];

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _saveFileService: SaveFileService,
    private _appRepoHelperService: AppRepoHelperService,
    private fb: FormBuilder,
    private _validationService: ValidationService
  ) {
    super(_serverApi, _validationService);
    super.wgFormData = new Object();
  }

  ngOnInit(): void {
    this.createFormGroup();
    super.wgOnInit();
  }
  createFormGroup() {
    this.wgFormGroup = this.fb.group({
      'status': ['', [Validators.required]],
      'comments': ['']
    });

    this.wgFC.status.setValue(this.dataModel.data.InspectionStatus)
  }

  setFieldData() {
    this.actionList  = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.INSPECTION_STATUS.toString());
  }

  getControlData() {
  }

  convertData(response: any) {
  }

  setMode(responseDataModel: any) {
  }

  setValue(responseDataModel: any) {
  }

  getFileApiData(fileId, filename) {
    this._serverApi.downloadFile(`/api/v1/file/${fileId}`).subscribe(
      response => {
        try {
          if (response) {
            this._saveFileService.saveZipFile(response, filename);
          }
        } catch (e) {
        }
      }, error => {
      }
    );
  }

  onFileClick(fileSrc) {
    window.open(fileSrc.changingThisBreaksApplicationSecurity, '_blank');
  }

  update(){
    
  }
  getValue(){
    const status = this.wgFC.status.value;
    const comments = this.wgFC.comments.value;
    this.wgFormData.status = status ? status : null;
    this.wgFormData.comments = comments ? comments : null;
    return this.wgFormData;
  }
}