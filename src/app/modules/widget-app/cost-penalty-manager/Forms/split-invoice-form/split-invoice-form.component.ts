import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {
  SplitInvoiceFormConfigModel,
  SplitInvoiceFormModel,
} from './split-invoice-form.model';
import { MatDialog } from '@angular/material/dialog';
import { GLOBAL_PARAM_KEY } from 'src/app/app-constants';
import { PERMIT_ACTIONS_CONFIG } from 'src/app/constants/db.constants';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { SaveFileService } from 'src/app/services/save-file.service';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { DataHelper } from 'src/app/utility/data.helper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';

@Component({
  selector: 'app-split-invoice-form',
  templateUrl: './split-invoice-form.component.html',
  styleUrls: ['./split-invoice-form.component.css'],
})
export class SplitInvoiceFormComponent
  extends WidgetComponentBase
  implements OnInit
{
  @Input() dataModel: SplitInvoiceFormModel;
  @Input() configModel: SplitInvoiceFormConfigModel;

  SplitInvoiceForm: FormGroup;

  arrLiabilityOrg: any[] = [];
  arrChargeType: any[] = [];

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    private _validationService: ValidationService,
    private _saveFileService: SaveFileService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    super(_serverApi, _validationService);
  }

  ngOnInit(): void {
    super.wgOnInit();

    this.createFormGroup();
  }

  createFormGroup(): void {
    this.SplitInvoiceForm = this.fb.group({
      chargeNumber: [''],
      chargeType: [''],
      draftChargeAmount: [''],
      chargeApprovalDate: [''],
      negotiatedCharge: [''],
      liabiltyOrg: [''],
      fileUp: [''],
      notes: ['', [Validators.required, Validators.minLength(10)]],
    });
  }
  setFieldData() {}
  stopPropagation(event) {
    event.stopPropagation();
  }
  setMode(responseDataModel: any) {}
  setValue(responseDataModel: any) {}
  getControlData() {
    // let id = this.dataModel.globalParameters.get('applicationId');
    // // INFO: ServerAPI
    // let url = `/api/v1/applications/${id}`
    // return this.wgAPIMethodGet(url, null);
    return new Promise((resolve, reject) => {
      let permitform: any = this.dataModel.globalParameters.get(
        GLOBAL_PARAM_KEY.VIEW_PERMIT_FORM
      );
      permitform = permitform ? permitform : new Object();
      if (permitform) {
        resolve(permitform);
      } else {
        reject(permitform);
      }
    });
  }
  convertData(response: any) {}
  getValue() {
    // let data: any;

    // data = this.dataModel.data;
    if (this.SplitInvoiceForm.valid) {
      return this.SplitInvoiceForm.value;
    }
  }

  resetForm() {
    this.SplitInvoiceForm.reset();
  }
  openFileUpload() {
    let data: any = new Object();
    this.emitEvent('openFileUploadDialog', data);
  }
}
