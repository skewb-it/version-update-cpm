import { Component, Input, OnInit } from '@angular/core';
import {
  PerformanceChartConfigModel,
  PerformanceChartDataModel,
} from './performance-chart.model';

import { NgxSpinnerService } from 'ngx-spinner';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';

@Component({
  selector: 'app-performance-chart',
  templateUrl: './performance-chart.component.html',
  styleUrls: ['./performance-chart.component.css'],
})
export class PerformanceChartComponent
  extends WidgetComponentBase
  implements OnInit
{
  @Input() title: string;
  // @Input() Data:any=[
  //   ['Immediate', 0],
  //   ['Minor', 0],
  //  ['Standard', 0],
  //  ['Major', 0]
  // ];
  // @Input() data:any;
  @Input() isInitalstate: boolean;
  backgroundColor: any;
  color: any;
  height: any;
  width: any;
  border: any;

  @Input() dataModel!: PerformanceChartDataModel;
  @Input() configModel!: PerformanceChartConfigModel;

  constructor(
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _validationService: ValidationService,
    private _spinner: NgxSpinnerService
  ) {
    super(_serverApiBase, _validationService);
  }

  ngOnInit(): void {
    this.wgOnInit();
    this.addBarSpans();
  }

  addBarSpans() {
    // this.dataModel.data = [];

    // this.dataModel.data.push(this.Data);

    const bars = document.getElementsByClassName('equalizer-bar');
    const equalizer = document.getElementById('equalizer');
    equalizer.innerHTML = '';
    for (let i = 0; i < this.dataModel.data.length; i++) {
      let html = '';
      for (let j = 0; j < 10; j++) {
        let tempnumber = this.dataModel.data[i][2].substring(
          0,
          this.dataModel.data[i][2].length - 1
        );
        let number = Number((tempnumber / 10).toFixed());
        if (j < number) {
          if (this.dataModel.data[i][0] == 'FPNs')
            html += '<span class="immediate"></span>';
          else if (this.dataModel.data[i][0] == 'S74')
            html += '<span class="minor"></span>';
          else if (this.dataModel.data[i][0] == 'Permit Charges')
            html += '<span class="standard"></span>';
          else if (this.dataModel.data[i][0] == 'Defect Charges')
            html += '<span class="major"></span>';
          else if (this.dataModel.data[i][0] == 'Miscellanous Charges')
            html += '<span class="major"></span>';
          else if (this.dataModel.data[i][0] == 'Sample Inspection Charges')
            html += '<span class="major"></span>';
          else if (this.dataModel.data[i][0] == 'Recharges')
            html += '<span class="major"></span>';
          else html += '<span class="active"></span>';
        } else {
          html += '<span></span>';
        }
      }

      equalizer.innerHTML +=
        `<div class="equalizer-bar-wrapper"><div class="equalizer-bar">` +
        html +
        `</div><div class="text-center" ><span>` +
        this.dataModel.data[i][0] +
        `</span><br><span>` +
        this.dataModel.data[i][2] +
        `</span></div></div>`;
    }
  }

  ngAfterViewInit() {}

  setFieldData() {}

  getControlData() {
    let url = this.dataModel.widgettableApi;
    this._spinner.show();
    return this.wgAPIMethodGet(url);
  }

  convertData(response: any) {
    this._spinner.hide();

    this.dataModel.data = [];
    // this.dataModel.data=this.Data;
    // this.dataModel.data = response.groups;

    response.groups[0].items.forEach((element, index) => {
      let temp = [];
      temp.push(element.name);
      temp.push(element.data);
      temp.push(element.display_data);
      //  temp[index][0]=element.name;
      //  temp[index][1]=element.data;
      this.dataModel.data.push(temp);
    });
    this.dataModel.total = response.groups[0].total;
    console.log('chart datamodel', this.dataModel.data);
    this.addBarSpans();
  }

  setMode(responseDataModel: any) {
    // throw new Error('Method not implemented.');
  }
  setValue(responseDataModel: any) {
    // throw new Error('Method not implemented.');
  }
}
