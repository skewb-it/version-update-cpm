import { EventEmitter } from 'events';

export class MatrixA1ConfigModel {

  static getInstance<T>(): MatrixA1ConfigModel {
    let model = new MatrixA1ConfigModel();
    return model
  }

  public static readonly COMP_TO_CALLER_GET_API_PARAM = "GET_API_PARAM"
  public static readonly COMP_TO_CALLER_ON_CLICK = "ON_CLICK"
  public static readonly COMP_TO_CALLER_ON_CLICK_BOTTOM_TEXT = "ON_CLICK_BOTTOM_TEXT"
  public static readonly COMP_TO_CALLER_CONVERT_DATA = "CONVERT_DATA"
  public static readonly COMP_TO_CALLER_PREPARE_DATA = "PREPARE_DATA"
  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"



  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class MatrixA1Model {

  static getInstance<T>(): MatrixA1Model {
    let model = new MatrixA1Model();


    model.tableRowHeadingLeft = "5%",
      model.tableRowHeadingRight = "32%",
      model.tableTdHeight = "171px"

    model.globalParameters = new Map();
    model.isSelfDataLoad = true;
    model.headers = [];
    model.items = [];
    model.rowHeaders = [];

    model.templateid = "Template1";
    model.showArrowIcon = true;

    model.columnLength = 4;
    model.rowLength = 3;
    model.showProgressBar = true;


    let headerItem = new MatrixA1HeaderItemModel();
    headerItem.headerText = "Outstanding"
    model.headers.push(headerItem);

    headerItem = new MatrixA1HeaderItemModel();
    headerItem.headerText = "Due this week"
    model.headers.push(headerItem);

    headerItem = new MatrixA1HeaderItemModel();
    headerItem.headerText = "This week's performance"
    model.headers.push(headerItem);


    let rowItem = new MatrixA1RowHeadingItemModel();
    rowItem.rowText = "Defects";
    rowItem.displayRowHeaderText = "Defects"
    rowItem.rowIcon = "fa fa-exclamation-triangle"
    rowItem.rowIconColor = "#4998e2";
    model.rowHeaders.push(rowItem);

    rowItem = new MatrixA1RowHeadingItemModel();
    rowItem.rowText = "Comment";
    rowItem.displayRowHeaderText = "Comment"
    rowItem.rowIcon = "fa fa-comments"
    rowItem.rowIconColor = "#4998e2";
    model.rowHeaders.push(rowItem);

    rowItem = new MatrixA1RowHeadingItemModel();
    rowItem.rowText = "Registration";
    rowItem.displayRowHeaderText = "Registration"
    rowItem.rowIcon = "fa fa-pencil-square-o"
    rowItem.rowIconColor = "#4998e2";
    model.rowHeaders.push(rowItem);

    model.headerCirlceClassFlag = false;
    return model
  }


  static getEmptyItems(rows: number, columns: number): MatrixA1ItemModel[][] {

    let items = [];

    for (let i = 0; i < rows; i++) {
      let rowItems = [];
      for (let j = 0; j < columns; j++) {
        let itemModel = new MatrixA1ItemModel();
        //Dummy percentage generats random value between 0 - 100;
        let dummyPercentage = Math.floor(Math.random() * (100 - 0 + 1) + 0);
        itemModel.displayText = dummyPercentage;
        itemModel.percentage = dummyPercentage;
        itemModel.bottonText = 0;
        itemModel.iconname = '';
        itemModel.isSummaryColumn = j == 2 ? true : false;
        itemModel.summaryText1 = j == 2 ? 'Planned' : '';
        itemModel.summaryText2 = j == 2 ? 'Due' : '';
        itemModel.summaryCount1 = j == 2 ? '10' : '0';
        itemModel.summaryCount2 = j == 2 ? '5' : '4';
        rowItems.push(itemModel);
      }
      items.push(rowItems);
    }

    return items;
  }


  id: string;
  widgetinstanceid: number;
  apiDataUrl: string;
  globalParameters: Map<string, any>;
  isSelfDataLoad: boolean;
  templateid: string;
  columnLength;
  rowLength;
  tableRowHeadingLeft: string;
  tabletitlePadding: string;
  tableRowHeadingRight: string;
  tableTdHeight: string;
  showProgressBar: boolean;
  showBottonText: boolean;
  headers: MatrixA1HeaderItemModel[]
  rowHeaders: MatrixA1RowHeadingItemModel[]
  items: MatrixA1ItemModel[][]
  showArrowIcon: boolean;
  headerCirlceClassFlag: boolean;

}


export class MatrixA1HeaderItemModel {
  constructor() {
    this.headerText = '';
  }
  headerBackgroundColor: string;
  displayHeaderIcon: boolean;
  headerIconColor: string;
  headerColor: string;
  headerText: string;
  headerIcon: string;
  headerValue: string;
}

export class MatrixA1RowHeadingItemModel {

  constructor() {
    this.rowIcon = '';
    this.rowText = '';
    this.rowIconColor = '';

  }
  colmBackgroundColor: string;

  rowText: string;
  rowIcon: string;
  rowIconColor: string;
  displayRowHeaderText: string;
}

export class MatrixA1ItemModel {
  displayText: number;
  percentage: number;
  bottonText: number;
  rowArrowIcon: string;
  rowArrowColor: string;
  bottomCenterText: string;
  text1: string;
  text2: string;
  iconname: string;
  iconcolor: string;
  isSummaryColumn: boolean;
  summaryText1: string;
  summaryText2: string;
  summaryCount1: string;
  summaryCount2: string;
}

export enum CLICK_EVENT {
  ON_BOTTOM_TEXT = "ON_BOTTOM_TEXT",
  ON_CLICK = "ON_CLICK",
  ON_CLICK_VAL1 = "ON_CLICK_1",
  ON_CLICK_VAL2 = "ON_CLICK_2",
  ON_CLICK_TEMPLATE3 = "ON_CLICK_TEMPLATE3"
}
