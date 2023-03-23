import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {
  EmailInvoiceFormConfigModel,
  EmailInvoiceFormModel,
} from './email-invoice-form.model';
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
  selector: 'app-email-invoice-form',
  templateUrl: './email-invoice-form.component.html',
  styleUrls: ['./email-invoice-form.component.css'],
})
export class EmailInvoiceFormComponent
  extends WidgetComponentBase
  implements OnInit
{
  @Input() dataModel: EmailInvoiceFormModel;
  @Input() configModel: EmailInvoiceFormConfigModel;

  EmailInvoiceForm: FormGroup;

  arrJobOwner: any[] = [];

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
    this.EmailInvoiceForm = this.fb.group({
      emailTo: ['', [Validators.required, Validators.email]],
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
    if (this.EmailInvoiceForm.valid) {
      return this.EmailInvoiceForm.value;
    }
  }

  resetForm() {
    this.EmailInvoiceForm.reset();
  }
}
