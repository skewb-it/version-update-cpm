import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import { DonutChartDataModel, DonutChartConfigModel } from './donut-chart.model';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent extends WidgetComponentBase implements OnInit {

  @Input() dataModel: DonutChartDataModel;
  @Input() configModel: DonutChartConfigModel;

  @ViewChild('donutChart') private chartRef;
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
    let myDonutChart = new Chart(this.chartRef.nativeElement, {
      type: 'doughnut',
      data: this.dataModel.data.data,
      options: this.dataModel.data.options
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
