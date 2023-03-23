import { Component, OnInit, Input } from '@angular/core';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { DashboardSelectsDataModel, DashboardSelectsConfigModel } from './dashboard-selects.model';

@Component({
  selector: 'app-dashboard-selects',
  templateUrl: './dashboard-selects.component.html',
  styleUrls: ['./dashboard-selects.component.css']
})
export class DashboardSelectsComponent extends WidgetComponentBase implements OnInit {

  @Input() dataModel: DashboardSelectsDataModel;
  @Input() configModel: DashboardSelectsConfigModel;

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
