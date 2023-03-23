import { Component, Input, OnInit } from '@angular/core';
import {
  PerformanceCardConfigModel,
  PerformanceCardDataModel,
} from './performance-card-model';

import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';

@Component({
  selector: 'app-performance-card',
  templateUrl: './performance-card.component.html',
  styleUrls: ['./performance-card.component.css'],
})
export class PerformanceCardComponent
  extends WidgetComponentBase
  implements OnInit
{
  @Input() title: 'demo1 ';

  @Input() dataModel!: PerformanceCardDataModel;
  @Input() configModel!: PerformanceCardConfigModel;

  constructor(
    private _formBuilder: FormBuilder,
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _datepipe: DatePipe,
    public _validationService: ValidationService,
    private _spinner: NgxSpinnerService
  ) {
    super(_serverApiBase, _validationService);
  }

  ngOnInit(): void {
    this.wgOnInit();
  }

  ngAfterViewInit() {
    this.wgRefreshData();
  }

  setFieldData() {}

  getControlData() {
    let url = this.dataModel.widgetCardApi;
    this._spinner.show();
    return this.wgAPIMethodGet(url);
  }

  convertData(response: any) {
    this._spinner.hide();

    this.dataModel.data = [
      {
        count: response.groups[0].items[0].data,
        icon: ' ',
        countColor: '#fff',
        text: response.groups[0].items[0].name,
        backgroundColor: '#DC2C2B',
      },
      {
        count: response.groups[0].items[1].data,
        icon: ' ',
        countColor: '#fff',
        text: response.groups[0].items[1].name,
        backgroundColor: '#F0B018',
      },
      {
        count: response.groups[0].items[2].data,
        icon: ' ',
        countColor: '#fff',
        text: response.groups[0].items[2].name,
        backgroundColor: '#418B12',
      },
    ];
  }

  setMode(responseDataModel: any) {}

  setValue(responseDataModel: any) {}
}
