import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { StackedColumnChartConfigModel, StackedColumnChartDataModel } from './stacked-column-chart.model';

import { Chart } from 'chart.js';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';

@Component({
  selector: 'app-stacked-column-chart',
  templateUrl: './stacked-column-chart.component.html',
  styleUrls: ['./stacked-column-chart.component.css']
})
export class StackedColumnChartComponent extends WidgetComponentBase implements OnInit {
  @Input() dataModel: StackedColumnChartDataModel;
  @Input() configModel: StackedColumnChartConfigModel;
  @ViewChild('stackedColumnChart') private chartRef;
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
