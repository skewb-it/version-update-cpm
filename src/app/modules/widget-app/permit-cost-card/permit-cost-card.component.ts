import { Component, Input, OnInit } from '@angular/core';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { PermitCostCardConfigModel, PermitCostCardDataModel } from './permit-cost-card-model';

@Component({
  selector: 'app-permit-cost-card',
  templateUrl: './permit-cost-card.component.html',
  styleUrls: ['./permit-cost-card.component.css']
})
export class PermitCostCardComponent extends WidgetComponentBase implements OnInit {
  @Input() dataModel: PermitCostCardDataModel;
  @Input() configModel: PermitCostCardConfigModel;

  constructor(
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _validationService: ValidationService
  ) {
    super(_serverApiBase, _validationService);
   }

   ngOnInit(): void {
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
