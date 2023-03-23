import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  StackedBarChartConfigModel,
  StackedBarChartDataModel,
} from './stacked-bar-chart.model';

// import Chart from 'chart.js/auto';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.css'],
})
export class StackedBarChartComponent
  extends WidgetComponentBase
  implements OnInit
{
  labelarray: any = [];
  datasetarray: any = [];
  tdarrary: any = [];

  @Input() dataModel: StackedBarChartDataModel;
  @Input() configModel: StackedBarChartConfigModel;

  @ViewChild('barChart') private chartRef;
  // chart: any;

  constructor(
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _validationService: ValidationService,
    private _spinner: NgxSpinnerService
  ) {
    super(_serverApiBase, _validationService);
  }

  ngOnInit(): void {
    this.wgOnInit();
    // this.bindchart();
  }

  ngAfterViewInit() {
    this.wgRefreshData();
  }

  setFieldData() {}

  bindchart() {
    if (this.dataModel.chartInstance) this.dataModel.chartInstance.destroy();

    this.dataModel.chartInstance = new Chart(this.chartRef.nativeElement, {
      // type: 'horizontalBar',
      type: 'bar',
      data: {
        labels: this.labelarray,
        datasets: this.datasetarray,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,

        // legend: {
        //   display: true,
        //   position: 'bottom',
        //   labels: {
        //     color: "#666666",
        //     // fontColor: "#666666",
        //     // fontSize: 18
        // },
        // },
        // legend:{},
        scales: {
          xAxes: {
            stacked: true, // this should be set to make the bars stacked
            ticks: {
              color: '#666666',
              // fontColor: "#666666",
              // fontSize: 14,
              // stepSize: 1,
              // beginAtZero: true
            },
          },
          y: {
            stacked: true, // this also..
            ticks: {
              color: '#666666',
              // fontColor: "#666666",
              // fontSize: 14,
              // stepSize: 1,
              // beginAtZero: true
              callback: function (value, index, values) {
                return '£' + value;
              },
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              color: '#666666',
              // fontColor: "#666666",
              // fontSize: 18
            },
          },
        },
      },
    });
  }

  getControlData() {
    let url = this.dataModel.widgetChartApi;
    this._spinner.show();
    return this.wgAPIMethodGet(url);
  }

  convertData(response: any) {
    console.log('response from stack ', response);

    this._spinner.hide();
    let temparray = [];
    let labelarr = [];
    let temparray1 = [];
    this.tdarrary.length = 0;
    this.datasetarray.length = 0;

    temparray.length = 0;
    temparray = [];
    response.columns.forEach((element) => {
      labelarr.push(element.display_text);
    });
    this.labelarray = labelarr;
    // this.dataModel.chartInstance.data.labels = temparray;

    temparray.length = 0;
    temparray = [];

    let backgourndarray = [
      '#3B78B4',
      '#73E0E0',
      '#E32E2C',
      '#F2BE6E',
      'purple',
      'yellow',
      'blue',
      'red',
      'blue',
      'green',
      '#554645',
      'whtie',
      'gray',
      'yellow',
      'blue',
      'red',
      'blue',
      'green',
      '#554645',
      'whtie',
      'gray',
      'yellow',
      'blue',
      'red',
      'blue',
      'green',
      '#554645',
      'whtie',
      'gray',
      'yellow',
      'blue',
      'red',
      'blue',
      'green',
      '#554645',
      'whtie',
      'gray',
      'yellow',
      'blue',
      'red',
      'blue',
      'green',
      '#554645',
      'whtie',
      'gray',
      'yellow',
      'blue',
    ];
    let headerarray = [
      'FPNs',
      'Defects',
      'Variations',
      'Works Start Due',
      'Works Stop Due',
    ];
    response.data.forEach((element, index) => {
      var tempobj: any = {};
      tempobj.data = [];
      // console.log("name",element.name)
      // tempobj.label = headerarray[index];
      tempobj.backgroundColor = backgourndarray[index];
      tempobj.data.length = 0;
      // temparray1=[];
      element.items.forEach((ele) => {
        tempobj.label = ele.item_code;

        // console.log(Number(ele.value))
        tempobj.data.push(Number(ele.value));
        // temparray1.push(ele.data)
      });

      /* for table start*/
      //       var obj:any;
      //    obj=tempobj.label;
      //    let te=[];
      //    te=tempobj.data;
      //    let temp=tempobj.label;
      //    te.unshift(temp);
      //    console.log("te",te)

      // this.tdarrary.push(te);

      /* for  table end */

      temparray.push(tempobj);
    });

    this.datasetarray = temparray;
    console.log('Stacked chart', this.dataModel.data);

    this.bindchart();
  }

  setMode(responseDataModel: any) {}

  setValue(responseDataModel: any) {}
}
