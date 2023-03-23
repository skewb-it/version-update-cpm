import { Component, Input, OnInit } from '@angular/core';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { TrafficManagementCostModel, TrafficManagementCostConfigModel } from './traffic-management-cost.model';

@Component({
  selector: 'app-traffic-management-cost',
  templateUrl: './traffic-management-cost.component.html',
  styleUrls: ['./traffic-management-cost.component.css']
})
export class TrafficManagementCostComponent extends WidgetComponentBase implements OnInit {
  @Input() dataModel: TrafficManagementCostModel;
  @Input() configModel: TrafficManagementCostConfigModel;
  
  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _validationService: ValidationService
  ) {  
    super(_serverApi, _validationService);
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
