import { Component, OnInit , Input} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { PCPRecordPaymentConfigModel, PCPRecordPaymentDataModel } from './pcp-record-payment.model';



@Component({
  selector: 'app-pcp-record-payment',
  templateUrl: './pcp-record-payment.component.html',
  styleUrls: ['./pcp-record-payment.component.css']
})
export class PcpRecordPaymentComponent extends WidgetComponentBase implements OnInit {


  @Input() dataModel: PCPRecordPaymentDataModel;
  @Input() configModel: PCPRecordPaymentConfigModel;

  constructor(
    private fb: FormBuilder,
    private _serverApi: ServerApiInterfaceServiceService,
    private _validationService: ValidationService,

  ) { 
    super(_serverApi, _validationService);

  }

  ngOnInit(): void {
    this.createFormGroup();

  }


  createFormGroup() {

    this.wgFormGroup = this.fb.group({
      'paymentamount': ['',[Validators.required]],
      'paymentdate': ['', [Validators.required]],

   
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
