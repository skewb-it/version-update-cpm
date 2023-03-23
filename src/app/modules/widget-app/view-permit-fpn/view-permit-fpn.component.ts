import { Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { ViewPermitFpnConfigModel, ViewPermitFpnDataModel, ViewPermitFpnModel, ViewPermitFpnRow } from './view-permit-fpn.module';
import { GLOBAL_PARAM_KEY } from 'src/app/app-constants';
import { SaveFileService } from 'src/app/services/save-file.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MASTER_DATA_DOMAIN } from 'src/app/constants/app-repo.constants';
import { FPN_STATUS } from 'src/app/constants/db.constants';

@Component({
  selector: 'app-view-permit-fpn',
  templateUrl: './view-permit-fpn.component.html',
  styleUrls: ['./view-permit-fpn.component.css']
})
export class ViewPermitFpnComponent extends WidgetComponentBase implements OnInit {

  @Input() dataModel: ViewPermitFpnDataModel;
  @Input() configModel: ViewPermitFpnConfigModel;

  actionList: any[] = [];
  showForm: boolean = true;

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _saveFileService: SaveFileService,
    private _appRepoHelperService: AppRepoHelperService,
    private _router: Router,
    private fb: FormBuilder,
    private _notificationService: NotificationService,
    private _validationService: ValidationService
  ) {
    super(_serverApi, _validationService);
  }

  ngOnInit() {
    this.createFormGroup();
  }

  createFormGroup() {
    this.wgFormGroup = this.fb.group({
      'action': ['', [Validators.required]],
      'comment': ['']
    });
    
    let tempActionList = this._appRepoHelperService.getMDataByDomain(MASTER_DATA_DOMAIN.FPN_STATUS.toString());
    tempActionList.forEach(fpnStatus => {
      // if (this.isFPNStatusAcceptedOrWithdrawn(fpnStatus.key)) {
        this.actionList.push(fpnStatus)
      // }
    });
    if (this.isFPNStatusAcceptedOrWithdrawn(this.dataModel.data.FPNStatus)) {
      this.wgFormGroup.disable();
    }
     if(this.dataModel.data.FPNStatus == FPN_STATUS.WITHDRAWN){
      this.showForm = false;
    }else{
      this.showForm = true;
      // let status = this.actionList.find(d=>d.key == this.dataModel.data.FPNStatus)
      // this.wgFC.action.setValue(status.value);
    }
  }



  getControlData() {
  }

  convertData(response: any) {
  }

  setFieldData() {
  }

  setMode(responseDataModel: any) {
  }

  setValue(responseDataModel: any) {
  }

  applyFilter(filterValue: string) {
  }

  getFileApiData(fileId, filename) {
    this._serverApi.downloadZipFile(`/api/v1/file/${fileId}`).subscribe(
      response => {

        try {
          if (response) {
            this._saveFileService.saveZipFile(response, filename)
          }
        } catch (e) {
        }
      }, error => {
      }
    );
  }

  onUpdateBtnClick() {
    this.wgFormGroup.markAllAsTouched()
    if (this.wgFormGroup.valid) {
      let fpnStatusRequest = {
        fpn_reason: this.wgFormGroup.controls.comment.value,
        fpn_status: this.wgFormGroup.controls.action.value,
      }
      let appId = this.dataModel.globalParameters.get('applicationId');
      let fpnId = this.dataModel.data.FPNId;
      this.wgAPIMethodPut(`/api/v1/applications/fpn/${appId}/${fpnId}`, fpnStatusRequest).then(resp => {
        this.emitEvent('onViewFPNUpdate');
      });
    }
  }

  onOkBtnClick() {
    this.emitEvent('onViewFPNOkClick');
  }
  
  // isFPNStatusAcceptedOrDisputed
  isFPNStatusAcceptedOrWithdrawn(fpnStatus) {
    return (fpnStatus == 'Accepted'  || fpnStatus == 'Withdrawn');
  }

  onFileClick(fileSrc) {
    window.open(fileSrc.changingThisBreaksApplicationSecurity, '_blank');
  }

}
