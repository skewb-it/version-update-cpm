import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import {
  MatrixA4ConfigModel,
  MatrixA4HeaderItemModel,
  MatrixA4ItemModel,
  MatrixA4Model,
  MatrixA4RowHeadingItemModel,
} from './matrix-a4-model';

import { AppRepoService } from 'src/app/services/app-repo.service';
import { CLICK_EVENT } from 'src/app/modules/widget-app/data-diff/data-diff-a3/data-diff-a3-model';
import { ErrorCodes } from 'src/app/models/common/error-codes';
import { MANAGEMENT_DB_MATRIX_FILTER } from 'src/app/constants/db.constants';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/services/notification.service';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { ValidationService } from 'src/app/services/validation.service';
import { WidgetComponentBase } from 'src/app/utility/widget/widget-utility/widget-component-base';
@Component({
  selector: 'app-matrix-a4',
  templateUrl: './matrix-a4.component.html',
  styleUrls: ['./matrix-a4.component.css'],
})
export class MatrixA4Component extends WidgetComponentBase implements OnInit {
  @Input() dataModel: MatrixA4Model;
  @Input() configModel: MatrixA4ConfigModel;

  clickEvent = CLICK_EVENT;
  matrixItems;

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _notificationService: NotificationService,
    private _appRepoService: AppRepoService,
    private _serverApiBase: ServerApiInterfaceServiceService,
    private _validationService: ValidationService,
    private _spinner: NgxSpinnerService
  ) {
    super(_serverApiBase, _validationService);
  }

  ngOnInit() {
    this.wgOnInit();
  }
  ngAfterViewInit() {
    this.setColSpan();
  }
  setColSpan() {
    let colSpan = this.dataModel.columnLength - 1;
    let colSpan2 = this.dataModel.column2Length;
    document
      .getElementById('kniwabi')
      .setAttribute('colspan', colSpan.toString());
    if (this.dataModel.colHeading[1]) {
      document
        .getElementById('kniwabino')
        .setAttribute('colspan', colSpan2.toString());
    }
  }

  setFieldData() {}

  getControlData() {
    let url = `/api/v1/cost-penalty/dashboard/jeopardy-metrics`;
    this._spinner.show();
    return this.wgAPIMethodGet(url);
  }

  convertData(response: any) {
    // this.dataModel.items = response;
    this._spinner.hide();
    this.matrixConvertData(response);
  }

  setMode(responseDataModel: any) {}

  setValue(responseDataModel: any) {}

  getHeaderItem(colNumber: number) {
    try {
      return this.dataModel.headers[colNumber];
    } catch (err) {
      console.error('Out of index header item', err);
    }

    return new MatrixA4HeaderItemModel();
  }
  getHeader2Item(colNumber: number) {
    try {
      return this.dataModel.headers2[colNumber];
    } catch (err) {
      console.error('Out of index header item', err);
    }

    return new MatrixA4HeaderItemModel();
  }

  getRowHeaderItem(rowNumber: number) {
    try {
      return this.dataModel.rowHeaders[rowNumber];
    } catch (err) {
      console.error('Out of index row item', err);
    }

    return new MatrixA4RowHeadingItemModel();
  }

  getProgressValue(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].percentage;
    } catch (err) {
      return 0;
    }
  }

  checkfiltervaluetotoal(rowNumber: number, colNumber: number) {
    try {
      if (
        this.dataModel.items[rowNumber][colNumber].filterValue ==
          MANAGEMENT_DB_MATRIX_FILTER.REGISTRATIONS_TOTAL ||
        this.dataModel.items[rowNumber][colNumber].filterValue ==
          MANAGEMENT_DB_MATRIX_FILTER.DEFECTS_TOTAL ||
        this.dataModel.items[rowNumber][colNumber].filterValue ==
          MANAGEMENT_DB_MATRIX_FILTER.FPNS_TOTAL
      ) {
        // console.log(this.dataModel.items[rowNumber][colNumber].filterValue)
        return true;
      } else return false;
    } catch (err) {
      return 0;
    }
  }

  checkIsRatioChartCol(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].isRatioChartColumn;
    } catch (err) {
      return 0;
    }
  }

  getItem(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].displayText;
    } catch (err) {
      return 0;
    }
  }
  getItem2(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items2[rowNumber][colNumber].displayText;
    } catch (err) {
      return 0;
    }
  }

  getItemText1(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].text1;
    } catch (err) {
      return '';
    }
  }

  getItemText2(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].text2;
    } catch (err) {
      return '';
    }
  }

  getBottonText(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].bottonText;
    } catch (err) {
      return 0;
    }
  }

  getIconColor(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].iconcolor;
    } catch (err) {
      return 0;
    }
  }

  getIconName(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].iconname;
    } catch (err) {
      return 0;
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  getRatioWidth(rowNumber: number, colNumber: number, index) {
    let widthInPercentage = 0;
    let totalWidthInPercentage =
      this.dataModel.items[rowNumber][colNumber].ratioChartCount1 +
      this.dataModel.items[rowNumber][colNumber].ratioChartCount2;
    switch (index) {
      case 1:
        widthInPercentage =
          (this.dataModel.items[rowNumber][colNumber].ratioChartCount1 /
            totalWidthInPercentage) *
          100;
        break;

      case 2:
        widthInPercentage =
          (this.dataModel.items[rowNumber][colNumber].ratioChartCount2 /
            totalWidthInPercentage) *
          100;
        break;

      default:
        break;
    }

    return `${widthInPercentage}%`;
  }

  getRatioChartCount1(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].ratioChartCount1;
    } catch (err) {
      return 0;
    }
  }

  getRatioChartCount1Color(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].ratioChartCount1Color;
    } catch (err) {
      return 0;
    }
  }

  getRatioChartCount2Color(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].ratioChartCount2Color;
    } catch (err) {
      return 0;
    }
  }

  getRatioChartLabelColor(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].ratioChartlabelColor;
    } catch (err) {
      return 0;
    }
  }

  getRatioChartCount2(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].ratioChartCount2;
    } catch (err) {
      return 0;
    }
  }

  getRatioChartLable1(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].ratioChartLabel1;
    } catch (err) {
      return 0;
    }
  }

  getRatioChartLable2(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].ratioChartLabel2;
    } catch (err) {
      return 0;
    }
  }

  onMatrixCountClick(eventData: any) {
    this.emitEvent('onMatrixCountClick', eventData);
  }

  onClick(
    rowIndex,
    columnIndex,
    itemsData: MatrixA4ItemModel,
    rowData: MatrixA4RowHeadingItemModel,
    columnData: MatrixA4HeaderItemModel
  ) {
    let eventDataObj = Object();
    eventDataObj.row = rowData.displayRowHeaderText;
    eventDataObj.col = columnData.headerValue;
    eventDataObj.filterValue = itemsData.filterValue;
    let action = '';

    if (this.configModel.EventAction.has(action)) {
      this.configModel.CompToCaller.emit(action, eventDataObj);
    }

    this.onMatrixCountClick(eventDataObj);
  }

  getData() {
    const apiUrlConst = this.dataModel.apiDataUrl;

    let reqData = Object();

    reqData.data = Object();
    reqData.data.id = this.dataModel.widgetinstanceid;

    this._serverApi.post<any, any>(apiUrlConst, reqData.data).subscribe(
      (response) => {
        this.matrixConvertData(response);
      },
      (error) => {
        switch (error.code) {
          case ErrorCodes.INVALID_USER_ACCESS:
            this._notificationService.error('Invalid User Access');
            break;
        }
      }
    );
  }

  //TODO:This method to be removed and widget generic api to be implemented
  matrixConvertData(response) {
    // let headerIndex = null;
    // let rowIndex = null;

    // for (let i = 0; i < this.dataModel.headers.length; i++) {
    //     headerIndex = i;
    //   for (let j = 0; j < response.length; j++) {
    //     rowIndex = j;
    //     if (rowIndex <= headerIndex || rowIndex >= headerIndex) {
    //         this.dataModel.items[rowIndex][headerIndex].displayText = response[rowIndex].count_value;
    //         this.dataModel.items[rowIndex][headerIndex].percentage = response[rowIndex].count_value;
    //         // if(response[rowIndex][headerIndex].isRatioChartColumn){
    //         //   this.dataModel.items[rowIndex][headerIndex].ratioChartCount1 = response[rowIndex][headerIndex].ratioChartCount1;
    //         //   this.dataModel.items[rowIndex][headerIndex].ratioChartCount2 = response[rowIndex][headerIndex].ratioChartCount2;
    //         // }
    //       }
    //   }
    // }
    // alert(response.groups[0].items[0].data)
    this.dataModel.items = [
      [
        {
          displayText: response.groups[0].items[0].data,
          percentage: response.groups[0].items[0].display_data,
          filterValue: MANAGEMENT_DB_MATRIX_FILTER.FPNS_OUTSTANDING,
          isRatioChartColumn: false,
        },
        {
          displayText: response.groups[1].items[0].data,
          percentage: response.groups[1].items[0].display_data,
          filterValue: MANAGEMENT_DB_MATRIX_FILTER.FPNS_DUETHISWEEK,
          isRatioChartColumn: false,
        },
        {
          displayText: response.groups[2].items[0].data,
          percentage: response.groups[2].items[0].display_data,
          filterValue: MANAGEMENT_DB_MATRIX_FILTER.FPNS_TOTAL,
          isRatioChartColumn: false,
        },
      ],
      [
        {
          displayText: response.groups[0].items[1].data,
          percentage: response.groups[0].items[1].display_data,
          filterValue: MANAGEMENT_DB_MATRIX_FILTER.DEFECTS_OUTSTANDING,
          isRatioChartColumn: false,
        },
        {
          displayText: response.groups[1].items[1].data,
          percentage: response.groups[1].items[1].display_data,
          filterValue: MANAGEMENT_DB_MATRIX_FILTER.DEFECTS_DUETHISWEEK,
          isRatioChartColumn: false,
        },
        {
          displayText: response.groups[2].items[1].data,
          percentage: response.groups[2].items[1].display_data,
          filterValue: MANAGEMENT_DB_MATRIX_FILTER.DEFECTS_TOTAL,
          isRatioChartColumn: false,
        },
      ],
      [
        {
          displayText: response.groups[0].items[2].data,
          percentage: response.groups[0].items[2].display_data,
          filterValue: MANAGEMENT_DB_MATRIX_FILTER.REGISTRATIONS_OUTSTANDING,
          isRatioChartColumn: false,
        },
        {
          displayText: response.groups[1].items[2].data,
          percentage: response.groups[1].items[2].display_data,
          filterValue: MANAGEMENT_DB_MATRIX_FILTER.REGISTRATIONS_DUETHISWEEK,
          isRatioChartColumn: false,
        },
        {
          displayText: response.groups[2].items[2].data,
          percentage: response.groups[2].items[2].display_data,
          filterValue: MANAGEMENT_DB_MATRIX_FILTER.REGISTRATIONS_TOTAL,
          isRatioChartColumn: false,
        },
      ],
    ];
  }
}
