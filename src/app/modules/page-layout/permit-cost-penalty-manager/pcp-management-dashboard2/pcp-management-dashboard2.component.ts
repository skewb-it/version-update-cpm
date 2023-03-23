import { Component, OnInit } from '@angular/core';
import { LineChartConfigModel, LineChartDataModel } from 'src/app/modules/widget/charts/line-chart/line-chart.model';
import { StackedColumnChartConfigModel, StackedColumnChartDataModel } from 'src/app/modules/widget/charts/stacked-column-chart/stacked-column-chart.model';

import { Chart } from 'chart.js';
import { EventActionService } from 'src/app/services/event-action.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { WidgetPageBase } from 'src/app/utility/widget/widget-utility/widget-page-base';

@Component({
  selector: 'app-pcp-management-dashboard2',
  templateUrl: './pcp-management-dashboard2.component.html',
  styleUrls: ['./pcp-management-dashboard2.component.css']
})
export class PcpManagementDashboard2Component extends WidgetPageBase implements OnInit {

  stackedColumnChartDataModel: StackedColumnChartDataModel;
  stackedColumnChartConfigModel: StackedColumnChartConfigModel;

  lineChartDataModel: LineChartDataModel;
  lineChartConfigModel: LineChartConfigModel;

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _eventActionServiceBase: EventActionService,
    private _sessionStorageService: SessionStorageService,
    private _router: Router,
    private _spinner: NgxSpinnerService
  ) {
    super(
      _serverApi,
      _eventActionServiceBase,
      _sessionStorageService,
      _router,
      _spinner
    );

    this.stackedColumnChartDataModel = StackedColumnChartDataModel.getInstance();
    this.stackedColumnChartConfigModel = StackedColumnChartConfigModel.getInstance();

    this.lineChartDataModel = LineChartDataModel.getInstance();
    this.lineChartConfigModel = LineChartConfigModel.getInstance();
  }

  ngOnInit(): void {
    this.bindStackedColumnChartDataModel();
    this.bindStackedColumnChartConfigModel();
    this.bindLineChartDataModel();
    this.bindLineChartConfigModel();
  }

  bindStackedColumnChartDataModel() {
    this.stackedColumnChartDataModel.data = {
      data: {
        labels: ["Status", "Finance", "Recharged Commercial"],
        datasets: [{
          label: 'Outstanding',
          data: [10, 10, 10],
          backgroundColor: "#3e6fb6",
          hoverBackgroundColor: '#3e6fb6'
        },
        {
          label: 'Written off',
          data: [23, 25, 19],
          backgroundColor: "#3e6fb6",
          hoverBackgroundColor: '#3e6fb6'
        },
        {
          label: 'Challenged',
          data: [19,10],
          backgroundColor: "#3e6fb6",
          hoverBackgroundColor: '#3e6fb6'
        },
        {
          label: 'Paid',
          data: [25, 31, 19],
          backgroundColor: "#3e6fb6",
          hoverBackgroundColor: '#3e6fb6'
        }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
          position: 'bottom'
        },
        scales: {
          xAxes: [{
            stacked: true,
            barPercentage: 0.5,
            gridLines : {
              display : false
          }
          }],
          yAxes: [{
            stacked: true,
            gridLines: {
              drawBorder: false,
            },
            ticks: {
              min: 0,
              max: 100,
              stepSize: 20,
            }
          }]
        },
        tooltips: {
          mode: 'index'
        },
        hover: {
          animationDuration: 0
        },
        animation: {
          duration: 1,
          onComplete: function () {
            var chartInstance = this.chart,
              ctx = chartInstance.ctx;

            // ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'center';
            ctx.fillStyle = '#ffffff';
            ctx.fillSize = 1;
            ctx.fontSize= 1;

            this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                var data = dataset.data[index];
                var label = dataset.label;
                // ctx.fillText(data, bar._model.x, bar._model.y + 12);
                ctx.fillText(label, bar._model.x, bar._model.y + 12);
              });
            });
          }
        }
      }
    }
  }
  bindStackedColumnChartConfigModel() {
  }

  bindLineChartDataModel() {
    this.lineChartDataModel.data = {
      data: {
        labels: ["Month 1", "Month 2","Month 3","Month 4","Month 5","Month 6","Month 7","Month 8"],
        datasets: [
          {
            label: "Projected",
            data: [10, 19, 15, 35, 38, 21, 25, 8],
            backgroundColor: "#E85933",
            borderColor: "#E85933",
            fill: false,
            lineTension: 0,
            radius: 1
          },
          {
          label: "Actual",
          data: [60, 35, 60, 35, 50, 45, 41, 20],
          backgroundColor: "#3E6FB6",
          borderColor: "#3E6FB6",
          fill: false,
          lineTension: 0,
          radius: 1
        }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          position: 'bottom'
        },
        scales: {
          xAxes: [{
            stacked: true,
            barPercentage: 0.5,
            gridLines : {
              display : false
          }
          }],
          yAxes: [{
            stacked: true,
            scaleLabel: {
              display: true,
              labelString: 'Cost'
            },
            gridLines: {
              drawBorder: false,
            },
            ticks: {
              min: 0,
              max: 100,
              stepSize: 20,
            }
          }]
        },
        tooltips: {
          mode: 'index'
        },
        hover: {
          animationDuration: 0
        }
      }
    }
  }
  bindLineChartConfigModel() {
  }

}
