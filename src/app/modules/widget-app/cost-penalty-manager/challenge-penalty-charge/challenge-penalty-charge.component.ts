import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { ChallengPenaltyChargeConfigModel, ChallengPenaltyChargeDataModel } from './challenge-penalty-charge.model';


@Component({
  selector: 'app-challenge-penalty-charge',
  templateUrl: './challenge-penalty-charge.component.html',
  styleUrls: ['./challenge-penalty-charge.component.css']
})
export class ChallengePenaltyChargeComponent extends WidgetComponentBase implements OnInit {

  @Input() dataModel: ChallengPenaltyChargeDataModel;
  @Input() configModel: ChallengPenaltyChargeConfigModel;

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
      'reasonforchallenge': ['', [Validators.required]],

   
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
