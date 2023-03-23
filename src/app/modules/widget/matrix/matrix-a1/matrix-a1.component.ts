import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ErrorCodes } from 'src/app/models/common/error-codes';
import { CLICK_EVENT, MatrixA1ConfigModel, MatrixA1HeaderItemModel, MatrixA1Model, MatrixA1RowHeadingItemModel } from './matrix-a1-model';
import { ServerApiInterfaceServiceService } from 'src/app/services/server-api-interface-service.service';
import { NotificationService } from 'src/app/services/notification.service';
import { AppRepoService } from 'src/app/services/app-repo.service';
import { WidgetConstants } from 'src/app/constants/widget-constants';

@Component({
  selector: 'app-matrix-a1',
  templateUrl: './matrix-a1.component.html',
  styleUrls: ['./matrix-a1.component.css']
})
export class MatrixA1Component implements OnInit, OnDestroy, OnChanges {

  @Input() dataModel: MatrixA1Model;
  @Input() configModel: MatrixA1ConfigModel;


  clickEvent = CLICK_EVENT;

  //TODO: This variable to be removed
  matrixItems;

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _notificationService: NotificationService,
    private _appRepoService: AppRepoService,
  ) { }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.dataModel.items = changes.dataModel.currentValue.items;
  }


  ngOnInit() {

    //This to be removed and should be configured with config data

    // this.configModel.CallerToComp.addListener(WidgetConstants.CALLER_TO_COMP_REFRESH_DATA, () => {
    //   this.RefreshData();
    // });
    this.dataModel.items = MatrixA1Model.getEmptyItems(this.dataModel.rowLength, this.dataModel.columnLength)

  }

  InitComponent() {
    this.dataModel.items = MatrixA1Model.getEmptyItems(this.dataModel.rowLength, this.dataModel.columnLength)

    if (this.dataModel.isSelfDataLoad) {
      this.RefreshData();
    }
  }

  ngOnDestroy(): void {
    this.configModel.CallerToComp.removeAllListeners();
  }

  RefreshData() {
    this.getData();
  }


  getHeaderItem(colNumber: number) {
    try {
      return this.dataModel.headers[colNumber]
    } catch (err) {
      console.error("Out of index header item", err);
    }

    return new MatrixA1HeaderItemModel();
  }

  getRowHeaderItem(rowNumber: number) {
    try {
      return this.dataModel.rowHeaders[rowNumber]
    } catch (err) {
      console.error("Out of index row item", err)
    }

    return new MatrixA1RowHeadingItemModel();

  }

  getProgressValue(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].percentage;
    } catch (err) {
      return 0
    }
  }

  getSummaryTextValue(rowNumber: number, colNumber: number, index) {
    try {
      if (index == 1) {
        return this.dataModel.items[rowNumber][colNumber].summaryText1;
      } else {
        return this.dataModel.items[rowNumber][colNumber].summaryText2;
      }
    } catch (err) {
      return 0
    }
  }

  getSummaryCountValue(rowNumber: number, colNumber: number, index) {
    try {
      if (index == 1) {
        return this.dataModel.items[rowNumber][colNumber].summaryCount1;
      } else {
        return this.dataModel.items[rowNumber][colNumber].summaryCount2;
      }
    } catch (err) {
      return 0
    }
  }

  checkIsSummaryStatusCol(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].isSummaryColumn;
    } catch (err) {
      return 0
    }
  }

  getItem(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].displayText;
    } catch (err) {
      return 0
    }
  }

  getItemText1(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].text1;
    } catch (err) {
      return ''
    }
  }

  getItemText2(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].text2;
    } catch (err) {
      return ''
    }
  }

  getBottonText(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].bottonText;
    } catch (err) {
      return 0
    }
  }

  getIconColor(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].iconcolor;
    } catch (err) {
      return 0
    }
  }

  getIconName(rowNumber: number, colNumber: number) {
    try {
      return this.dataModel.items[rowNumber][colNumber].iconname;
    } catch (err) {
      return 0
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  onClick(eventname: CLICK_EVENT, rowIndex, columnIndex, rowData: MatrixA1RowHeadingItemModel, columnData: MatrixA1HeaderItemModel) {

    let eventDataObj = Object();
    eventDataObj.row = rowData.displayRowHeaderText;
    eventDataObj.col = columnData.headerValue;
    eventDataObj.workFlowCode = rowData.rowText;

    let action = "";

    switch (eventname) {
      case CLICK_EVENT.ON_CLICK_VAL1:
        action = "cell" + rowIndex + columnIndex + "_1";
        break;
      case CLICK_EVENT.ON_CLICK_VAL2:
        action = "cell" + rowIndex + columnIndex + "_2";
        break;
      case CLICK_EVENT.ON_CLICK_TEMPLATE3:
        action = "cell" + rowIndex + columnIndex;
        break;
      default:
        action = "cell" + rowIndex + columnIndex;
    }

    if (this.configModel.EventAction.has(action)) {
      this.configModel.CompToCaller.emit(action, eventDataObj);
    }
  }


  getData() {

    const apiUrlConst = this.dataModel.apiDataUrl;

    let reqData = Object();

    reqData.data = Object();
    reqData.data.id = this.dataModel.widgetinstanceid;

    this._serverApi.post<any, any>(apiUrlConst, reqData.data).subscribe(response => {
      this.matrixConvertData(response)


    }, error => {
      switch (error.code) {
        case ErrorCodes.INVALID_USER_ACCESS:
          this._notificationService.error('Invalid User Access');
          break;
      }
    });
  }

  //TODO:This method to be removed and widget generic api to be implemented
  matrixConvertData(response) {

    if (response.data && response.data.length > 0) {
      response.data.forEach((row) => {

        let headerIndex = null;
        let rowIndex = null;

        for (let i = 0; i < this.dataModel.headers.length; i++) {
          if (this.dataModel.headers[i].headerValue == row.colname) {
            headerIndex = i;
          }
        }

        for (let i = 0; i < this.dataModel.rowHeaders.length; i++) {
          let displayRowHeaderText = this.dataModel.rowHeaders[i].displayRowHeaderText
          if (row.rowname.includes(this.dataModel.rowHeaders[i].displayRowHeaderText)) {
            this.dataModel.rowHeaders[i].displayRowHeaderText = row.rowname;
            rowIndex = i;
          }
        }

        if (rowIndex != null && headerIndex != null) {
          this.dataModel.items[rowIndex][headerIndex].displayText = row.prival
          this.dataModel.items[rowIndex][headerIndex].bottonText = row.secval
          this.dataModel.items[rowIndex][headerIndex].percentage = row.progval
          this.dataModel.items[rowIndex][headerIndex].text1 = row.text1
          this.dataModel.items[rowIndex][headerIndex].text2 = row.text2
          this.dataModel.items[rowIndex][headerIndex].iconname = row.iconname
          this.dataModel.items[rowIndex][headerIndex].iconcolor = row.iconcolor
        }
      })
    }

  }

}
