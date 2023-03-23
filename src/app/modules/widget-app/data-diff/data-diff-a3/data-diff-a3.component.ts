import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DataDiffA3ColumnDataItemModel, DataDiffA3ConfigModel, DataDiffA3Model } from './data-diff-a3-model';

import { NgxSpinnerService } from 'ngx-spinner';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ToastrService } from 'ngx-toastr';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';

//import { WidgetConstants } from 'src/app/modules/widgets/widget-constants';







@Component({
  selector: 'app-data-diff-a3',
  templateUrl: './data-diff-a3.component.html',
  styleUrls: ['./data-diff-a3.component.css']
})
export class DataDiffA3Component extends WidgetComponentBase implements OnInit {

  displayedColumns: DataDiffA3ColumnDataItemModel[] = [];
  isLoading = false;

  @Input() dataModel: DataDiffA3Model;
  @Input() configModel: DataDiffA3ConfigModel;

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _toastnotificationservice: ToastrService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _spinner: NgxSpinnerService,
    private _validationService: ValidationService
  ) {
    super(_serverApi, _validationService);
  }

  ngOnInit() {
    // this.configModel.CallerToComp.addListener(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA, () => {
    //   this.RefreshData();
    // });

    // this.dataModel.dataSource1 = [];
    // this.dataModel.dataSource2 = [];

    // this.setData();

    this.wgOnInit();
  }

  setFieldData() {
  }

  getControlData() {
    let alterationApplicationId = this.dataModel.globalParameters.get("alterationApplicationId");
    console.log('alterationApplicationId', alterationApplicationId)
    return this.wgAPIMethodGet(`/api/v1/applications/${alterationApplicationId}/compare-alterations`);
  }

  convertData(response: any) {
console.log("response data diff",response)
    let displayedColumns = [];
    let dataSurce1Object = [];
    let dataSurce2Object = [];

    if (response && (response.length > 0)) {
      response.forEach(field => {
        let colData = new DataDiffA3ColumnDataItemModel();
        colData.field = field.field_name
        colData.name = field.field_name
        displayedColumns.push(colData);
        dataSurce1Object.push( {
          headername: field.field_name,
          isupdatesuccess: true,
          value: field.changed_value
        });
        dataSurce2Object.push( {            //[field.field_name] = {
          headername: field.field_name,
          isupdatesuccess: true,
          value: field.original_value
        });
      });
    }

    return [displayedColumns, dataSurce1Object, dataSurce2Object];

  }

  setMode(responseDataModel: any) {
  }

  setValue(responseDataModel: any) {
    this.displayedColumns = [];
    this.dataModel.dataSource1 = [];
    this.dataModel.dataSource2 = [];


    this.displayedColumns = responseDataModel[0];
    this.dataModel.dataSource1.push(responseDataModel[1]);
    this.dataModel.dataSource2.push(responseDataModel[2]);




    this._changeDetectorRef.detectChanges();

  }



  getRowValue(rowdata, colname) {
    switch (this.dataModel.bindingStrategy) {
      case 1:
        return  rowdata.filter(item => item.headername === colname)[0].value;
      default:
        return  rowdata.filter(item => item.headername === colname)[0];
    }
  }

  compareData(data1, data3, colname) {
    let value1;
    let value2;

    switch (this.dataModel.bindingStrategy) {
      case 1:
        value1 = data1.filter(item => item.headername === colname)[0]?.value;
        value2 = data3.filter(item => item.headername === colname)[0]?.value;
        break
      default:
        value1 = true;
        value2 = true;
        break
    }
    if (value1 == value2) {
      return true;
    } else {
      return false;
    }
  }

  onClick(data, actionName) {

    let eventDataObj = Object();
    eventDataObj.eventData = data;

    let action = actionName;

    if (this.configModel.EventAction.has(action)) {
      this.configModel.CompToCaller.emit(action, eventDataObj);
    }

  }

  ngOnDestroy(): void {

  }

}
