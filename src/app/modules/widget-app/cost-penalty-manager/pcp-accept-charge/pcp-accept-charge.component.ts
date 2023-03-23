import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { PcpAcceptChargeConfigModel, PcpAcceptChargeDataModel } from './pcp-accept-charge.model';

@Component({
  selector: 'app-pcp-accept-charge',
  templateUrl: './pcp-accept-charge.component.html',
  styleUrls: ['./pcp-accept-charge.component.css']
})
export class PcpAcceptChargeComponent extends WidgetComponentBase implements OnInit {


  @Input() dataModel: PcpAcceptChargeDataModel;
  @Input() configModel: PcpAcceptChargeConfigModel;

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
      'notesaccompnyingacceptance': ['', [Validators.required]],

   
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
