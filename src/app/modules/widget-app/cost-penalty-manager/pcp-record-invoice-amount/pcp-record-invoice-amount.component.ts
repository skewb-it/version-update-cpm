import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { PCPRecordInvoiceAmountConfigModel, PCPRecordInvoiceAmountDataModel } from './pcp-record-invoice-amount.model';

@Component({
  selector: 'app-pcp-record-invoice-amount',
  templateUrl: './pcp-record-invoice-amount.component.html',
  styleUrls: ['./pcp-record-invoice-amount.component.css']
})
export class PcpRecordInvoiceAmountComponent extends WidgetComponentBase implements OnInit {
  @Input() dataModel: PCPRecordInvoiceAmountDataModel;
  @Input() configModel: PCPRecordInvoiceAmountConfigModel;
  
  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _validationService: ValidationService,
    private fb: FormBuilder
  ) {  
    super(_serverApi, _validationService);
  }

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup() {
    this.wgFormGroup = this.fb.group({
      'invoiceDescription': ['',[Validators.required]],
      'invoicereceiptdate': ['',[Validators.required]],
      'invoicepaymentduedate': ['',[Validators.required]]
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

}
