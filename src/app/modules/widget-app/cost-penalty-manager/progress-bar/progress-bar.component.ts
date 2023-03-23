import { Component, Input, OnInit } from '@angular/core';
import {
  ProgressBarConfigModel,
  ProgressBarDataModel,
} from './progress-bar-model';

import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent
  extends WidgetComponentBase
  implements OnInit
{
  @Input() dataModel!: ProgressBarDataModel;
  @Input() configModel!: ProgressBarConfigModel;

  constructor(
    private _formBuilder: FormBuilder,
    // private _serverApiBase: ServerApiInterfaceServiceService,
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _datepipe: DatePipe,
    public _validationService: ValidationService,
    private _spinner: NgxSpinnerService
  ) {
    super(_serverApiBase, _validationService);

    //  super(_formBuilderbase, _serverApiBase, _datepipe,_validationServiceBase)
    // super(_formBuilderbase,_serverBaseApi,_datepipe,_validationServiceBase)
    // super(_formBuilder,_serverBaseApi,_datepipe,_validationServiceBase, _baseAppRepoHelperService)
    // super(_serverApiBase, _validationService,);
  }

  ngOnInit(): void {
    this.wgOnInit();
  }

  ngAfterViewInit() {
    this.wgRefreshData();
  }

  setFieldData() {}

  getControlData() {
    let url = this.dataModel.widgetApiUrl;
    this._spinner.show();
    return this.wgAPIMethodGet(url);
  }

  convertData(response: any) {
    // console.log('progress bar', response);

    this._spinner.hide();
    //  let colorArray=["#DC2C2B","#F0B018","#DC2C2B","#DC2C2B","green","#3E6EB6","#DC2C2B","#F0B018","#DC2C2B","#DC2C2B","green","#3E6EB6"];
    let temparray = [];
    response.data.forEach((element, index) => {
      //  alert(element.items[0].display_text)
      let item: any = {};
      item.text = element.items[0].display_text;
      item.count = element.items[1].display_text;
      item.countColor = '#000';
      item.value = element.items[1].value;
      item.valuecolor = element.items[1].background_color;
      // console.log("item",item)
      temparray.push(item);
      // this.dataModel.data.push(item);
    });
    // console.log("temparray of idicator",temparray)

    this.dataModel.data = temparray;
    // console.log('datamodel of idicator', this.dataModel.data);

    // this.dataModel.data=[

    //   {
    //   text:response.groups[0].items[0].name,
    //   count:response.groups[0].items[0].display_data,
    //   countColor:"#000",
    //   value:response.groups[0].items[0].data,
    //   valuecolor:"#DC2C2B",
    // },

    // {
    //   text:response.groups[0].items[1].name,
    //   count:response.groups[0].items[1].display_data,
    //   countColor:"#000",
    //   value:response.groups[0].items[1].data,
    //   valuecolor:"#F0B018",
    // },

    // {
    //   text:response.groups[0].items[2].name,
    //   count:response.groups[0].items[2].display_data,
    //   countColor:"#000",
    //   value:response.groups[0].items[2].data,
    //   valuecolor:"#DC2C2B",
    // },

    // {
    //   text:response.groups[0].items[3].name,
    //   count:response.groups[0].items[3].display_data,
    //   countColor:"#000",
    //   value:response.groups[0].items[3].data,
    //   valuecolor:"#DC2C2B",
    // },
    // {
    //   text:response.groups[0].items[4].name,
    //   count:response.groups[0].items[4].display_data,
    //   countColor:"#000",
    //   value:response.groups[0].items[4].data,
    //   valuecolor:"green",
    // },

    // {
    //   text:response.groups[0].items[5].name,
    //   count:response.groups[0].items[5].display_data,
    //   countColor:"#000",
    //   value:response.groups[0].items[5].data,
    //   valuecolor:"#3E6EB6",
    // },
    // ]
  }

  setMode(responseDataModel: any) {}

  setValue(responseDataModel: any) {}
}
