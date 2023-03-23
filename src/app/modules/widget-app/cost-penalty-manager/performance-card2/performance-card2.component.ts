import { Component, Input, OnInit } from '@angular/core';
import {
  PerformanceCard2ConfigModel,
  PerformanceCard2DataModel,
} from './performance-card2-model';

import { DatePipe } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';

@Component({
  selector: 'app-performance-card2',
  templateUrl: './performance-card2.component.html',
  styleUrls: ['./performance-card2.component.css'],
})
export class PerformanceCard2Component
  extends WidgetComponentBase
  implements OnInit
{
  @Input() dataModel!: PerformanceCard2DataModel;
  @Input() configModel!: PerformanceCard2ConfigModel;

  constructor(
    private _formBuilder: FormBuilder,
    private _serverApi: ServerApiInterfaceServiceService,
    private _datepipe: DatePipe,
    public _validationService: ValidationService,
    private _spinner: NgxSpinnerService
  ) {
    super(_serverApi, _validationService);
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
    // let url = this.dataModel.widgetCardApi;
    this._spinner.show();
    // return this.wgAPIMethodGet(url);
  }

  onClick(filterCode, displayText) {
    let eventDataObj = Object();
    // eventDataObj.row = rowData.displayRowHeaderText;
    // eventDataObj.col = columnData.headerValue;
    eventDataObj.filterValue = filterCode;
    eventDataObj.filterDisplay = displayText;
    this.onMixturePermitCountClick(eventDataObj);
  }

  onMixturePermitCountClick(eventData) {
    console.log('eventdat', eventData);
    this.emitEvent('onMixturePermitCountClick', eventData);
  }

  convertData(response: any) {
    this._spinner.hide();

    console.log('mixture response', response);
    let iconArray = [
      'verified',
      'task',
      'currency_pound',
      'warning',
      'cancel',
      'disabled_by_default',
      'thumb_down_alt',
      'not_listed_location',
    ];
    let backgroundColorArray = [
      '#3E6FB6',
      '#3E6FB6',
      '#3E6FB6',
      '#3E6FB6',
      '#3E6FB6',
      '#DC2C2B',
      '#DC2C2B',
      '#DC2C2B',
      '#F0B018',
      '#F0B018',
      '#F0B018',
    ];
    let temparray = [];
    response.data.forEach((element, index) => {
      // this.dataModel.columndata.push(elements.name)
      let temp: any = new Object();
      temp.backgroundColor = backgroundColorArray[index];
      temp.icon = iconArray[index];
      temp.text = element.items[0].display_text;
      temp.count = element.items[1].value;
      temp.filter_code = element.items[1].filter_code;
      temp.filter_display_text = element.items[1].filter_display_text;
      temparray.push(temp);
    });
    console.log('temparray', temparray);
    this.dataModel.data = temparray;

    // this.dataModel.data=[{
    //   subtext:response.groups[0].items[0].name,
    //   icon:"verified",
    //   text:response.groups[0].items[0].data,
    //   backgroundColor:"#3E6FB6"
    //   },
    //   {
    //     subtext:response.groups[0].items[1].name,
    //     icon:"task",
    //     text:response.groups[0].items[1].data,
    //     backgroundColor:"#3E6FB6"
    //     },
    //     {
    //       subtext:response.groups[0].items[2].name,
    //       icon:"currency_pound",
    //       text:response.groups[0].items[2].data,
    //       backgroundColor:"#DC2C2B"
    //       },
    //       {
    //         subtext:response.groups[0].items[3].name,
    //         icon:"warning",
    //         text:response.groups[0].items[3].data,
    //         backgroundColor:"#DC2C2B"
    //         },
    //         {
    //           subtext:response.groups[0].items[4].name,
    //           icon:"cancel",
    //           text:response.groups[0].items[4].data,
    //           backgroundColor:"#DC2C2B"
    //           },
    //           {
    //             subtext:response.groups[0].items[5].name,
    //             icon:"disabled_by_default",
    //             text:response.groups[0].items[5].data,
    //             backgroundColor:"#F0B018"
    //             },
    //             {
    //               subtext:response.groups[0].items[6].name,
    //               icon:"thumb_down_alt",
    //               text:response.groups[0].items[6].data,
    //               backgroundColor:"#F0B018"
    //               },
    //               {
    //                 subtext:response.groups[0].items[7].name,
    //                 icon:"not_listed_location",
    //                 text:response.groups[0].items[7].data,
    //                 backgroundColor:"#F0B018"
    //                 }

    // ]

    // console.log('Perform Car 2', this.dataModel.data);
  }

  setMode(responseDataModel: any) {}

  setValue(responseDataModel: any) {}
}
