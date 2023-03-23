import { Component, OnInit, Input } from '@angular/core';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { PotentialCostCardDataModel, PotentialCostCardConfigModel } from './potential-cost-card.model';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-potential-cost-card',
  templateUrl: './potential-cost-card.component.html',
  styleUrls: ['./potential-cost-card.component.css']
})
export class PotentialCostCardComponent extends WidgetComponentBase implements OnInit {

  @Input() dataModel: PotentialCostCardDataModel;
  @Input() configModel: PotentialCostCardConfigModel;

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
