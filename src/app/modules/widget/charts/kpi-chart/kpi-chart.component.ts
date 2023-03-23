import { Component, OnInit, Input } from '@angular/core';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { KPIChartDataModel, KPIChartConfigModel } from './kpi-chart.model';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-kpi-chart',
  templateUrl: './kpi-chart.component.html',
  styleUrls: ['./kpi-chart.component.css']
})
export class KpiChartComponent extends WidgetComponentBase implements OnInit {

  @Input() dataModel: KPIChartDataModel;
  @Input() configModel: KPIChartConfigModel;

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
