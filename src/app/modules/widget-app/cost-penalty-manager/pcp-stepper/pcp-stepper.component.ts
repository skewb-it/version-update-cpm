import { Component, Input, OnInit } from '@angular/core';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import {
  PCPStepperConfigModel,
  PCPStepperDataModel,
} from './pcp-stepper.model';
@Component({
  selector: 'app-pcp-stepper',
  templateUrl: './pcp-stepper.component.html',
  styleUrls: ['./pcp-stepper.component.css'],
})
export class PcpStepperComponent extends WidgetComponentBase implements OnInit {
  @Input() dataModel: PCPStepperDataModel;
  @Input() configModel: PCPStepperConfigModel;

  constructor(
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _validationService: ValidationService
  ) {
    super(_serverApiBase, _validationService);
  }

  ngOnInit(): void {
    this.wgOnInit();
    // console.log("dataModel: ",this.dataModel.StepperfilterModel);
  }

  setFieldData() {}

  getControlData() {}

  convertData(response: any) {}

  setMode(responseDataModel: any) {}

  setValue(responseDataModel: any) {}

  onCountClick(item) {
    this.emitEvent(PCPStepperConfigModel.COMP_TO_CALLER_COUNT_CLICKED, item);
  }
}
