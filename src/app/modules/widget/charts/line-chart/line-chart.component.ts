import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LineChartConfigModel, LineChartDataModel } from './line-chart.model';

import { Chart } from 'chart.js';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent extends WidgetComponentBase implements OnInit {
  @Input() dataModel: LineChartDataModel;
  @Input() configModel: LineChartConfigModel;
  @ViewChild('lineChart') private chartRef;
  chart: any;

  constructor(
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _validationService: ValidationService
  ) {
    super(_serverApiBase, _validationService);
  }

  ngOnInit(): void {
    this.wgOnInit();
  }

  ngAfterViewInit() {
    let myStackedColumnChart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: this.dataModel.data.data,
      options: this.dataModel.data.options,
    });
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
