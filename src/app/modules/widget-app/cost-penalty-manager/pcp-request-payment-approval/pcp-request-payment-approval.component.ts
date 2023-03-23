import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { PCPRequestPaymentApprovalConfigModel, PCPRequestPaymentApprovalDataModel } from './pcp-request-payment-approval.model';

@Component({
  selector: 'app-pcp-request-payment-approval',
  templateUrl: './pcp-request-payment-approval.component.html',
  styleUrls: ['./pcp-request-payment-approval.component.css']
})
export class PcpRequestPaymentApprovalComponent extends WidgetComponentBase implements OnInit {
  @Input() dataModel: PCPRequestPaymentApprovalDataModel;
  @Input() configModel: PCPRequestPaymentApprovalConfigModel;
  
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
      'invoiceamount': [''],
      'invoicereceiptdate': [''],
      'emailaddress': [''],
      'invoicepaymentduedate': [''],
      'notesaccompnyingapprovalreq': ['']
    });
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
