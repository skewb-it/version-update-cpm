import { Component, Input, OnInit } from '@angular/core';
import {
  StepperCostConfigModel,
  StepperCostDataModel,
} from './stepper-cost.model';

import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { TransformCurrencyPipe } from 'src/app/pipe/transform-currency/transform-currency.pipe';
import { TransformDatePipe } from 'src/app/pipe/transform-date/transform-date.pipe';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';

@Component({
  selector: 'app-pcp-stepper-cost',
  templateUrl: './pcp-stepper-cost.component.html',
  styleUrls: ['./pcp-stepper-cost.component.css'],
  providers: [TransformDatePipe, TransformCurrencyPipe],
})
export class PcpStepperCostComponent
  extends WidgetComponentBase
  implements OnInit
{
  @Input() dataModel: StepperCostDataModel;
  @Input() configModel: StepperCostConfigModel;

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
    this.emitEvent(StepperCostConfigModel.COMP_TO_CALLER_COUNT_CLICKED, item);
  }
}
