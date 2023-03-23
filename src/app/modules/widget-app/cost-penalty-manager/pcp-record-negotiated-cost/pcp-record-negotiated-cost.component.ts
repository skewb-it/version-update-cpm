import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { PCPRecordNegotiatedCostConfigModel, PCPRecordNegotiatedCostDataModel } from './pcp-record-negotiated-cost.model';


@Component({
  selector: 'app-pcp-record-negotiated-cost',
  templateUrl: './pcp-record-negotiated-cost.component.html',
  styleUrls: ['./pcp-record-negotiated-cost.component.css']
})
export class PcpRecordNegotiatedCostComponent extends WidgetComponentBase implements OnInit {


  @Input() dataModel: PCPRecordNegotiatedCostDataModel;
  @Input() configModel: PCPRecordNegotiatedCostConfigModel;

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
      'negotiatedamount': ['',[Validators.required]],
      'agreedbyhacontactname': ['', [Validators.required]],

   
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
