import { BarChartConfigModel, BarChartDataModel } from './bar-chart.model';
import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { Chart } from 'chart.js';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent extends WidgetComponentBase implements OnInit {

  @Input() dataModel: BarChartDataModel;
  @Input() configModel: BarChartConfigModel;

  @ViewChild('barChart') private chartRef;
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
    let myBarChart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
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
