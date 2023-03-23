import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppRepoHelperService } from 'src/app/services/app-repo-helper.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { AddRecordInvoiceChargesConfigModel, AddRecordInvoiceChargesDataModel, AddRecordInvoiceChargesModel } from './add-record-invoice-charges.model';

@Component({
  selector: 'app-add-record-invoice-charges',
  templateUrl: './add-record-invoice-charges.component.html',
  styleUrls: ['./add-record-invoice-charges.component.css']
})
export class AddRecordInvoiceChargesComponent extends WidgetComponentBase implements OnInit {

  @Input() dataModel: AddRecordInvoiceChargesModel;
  @Input() configModel: AddRecordInvoiceChargesConfigModel;
  arrCostType: any[] = [
    {
      value: "PERMIT CHARGE",
      viewValue: "Permit Charge"
    },
    {
      value: "FPN",
      viewValue: "FPN"
    }
  ];
  constructor(private _serverApi: ServerApiInterfaceServiceService,
    private _appRepoHelperService: AppRepoHelperService,
    private _validationService: ValidationService,
    private fb: FormBuilder,
    private _notificationService: NotificationService
    ) {
    super(_serverApi, _validationService);
  }

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup() {
    this.wgFormGroup = this.fb.group({
      'invoiceNumber': ['',[Validators.required]],
      'invoiceDate': ['',[Validators.required]],
      'invoiceAmount': ['',[Validators.required]],
      'costType':['',[Validators.required]],
      'invoiceDesc':['',[Validators.required]],
      'chargesDesc':['',[Validators.required]]
    });
    this.wgFormGroup.reset();
    this.wgFormGroup.markAsUntouched();
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

  getValue() {
    let data: any = new Object();
    if (this.wgFormGroup.controls.invoiceNumber.value) {
      data.invoiceNumber = this.wgFormGroup.controls.invoiceNumber.value;
    }
    if (this.wgFormGroup.controls.invoiceDate.value) {
      data.invoiceDate = this.wgFormGroup.controls.invoiceDate.value;
    }
    if (this.wgFormGroup.controls.invoiceAmount.value) {
      data.invoiceAmount = this.wgFormGroup.controls.invoiceAmount.value;
    }
    if (this.wgFormGroup.controls.costType.value) {
      data.costType = this.wgFormGroup.controls.costType.value;
    }
    if (this.wgFormGroup.controls.invoiceDesc.value) {
      data.invoiceDesc = this.wgFormGroup.controls.invoiceDesc.value;
    }
    if (this.wgFormGroup.controls.chargesDesc.value) {
      data.chargesDesc = this.wgFormGroup.controls.chargesDesc.value;
    }
    return data;
  }

  addRecordInvoiceCharges(){
    this.wgFormGroup.markAllAsTouched();
    if (this.wgFormGroup.dirty && this.wgFormGroup.valid) {
      let data:AddRecordInvoiceChargesDataModel = this.getValue();
      this.wgReset();
      this.emitEvent("onSaveInvoiceClick", data);
        } else {
      try {
        this._notificationService.error(this.wgFormGroup.errors.dateCompare.errorMessage)
      } catch (exception) {
      }
    }
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');
  }

}
