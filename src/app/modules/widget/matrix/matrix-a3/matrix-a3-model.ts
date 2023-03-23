import { EventEmitter } from 'events';

export class MatrixA3ConfigModel {
  static getInstance<T>(): MatrixA3ConfigModel {
    let model = new MatrixA3ConfigModel();
    return model;
  }

  public static readonly COMP_TO_CALLER_GET_API_PARAM = 'GET_API_PARAM';
  public static readonly COMP_TO_CALLER_ON_CLICK = 'ON_CLICK';
  public static readonly COMP_TO_CALLER_ON_CLICK_BOTTOM_TEXT =
    'ON_CLICK_BOTTOM_TEXT';
  public static readonly COMP_TO_CALLER_CONVERT_DATA = 'CONVERT_DATA';
  public static readonly COMP_TO_CALLER_PREPARE_DATA = 'PREPARE_DATA';
  public static readonly CALLER_TO_COMP_REFRESH_DATA = 'REFRESH_DATA';

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();
}

export class MatrixA3Model {
  static getInstance<T>(): MatrixA3Model {
    let model = new MatrixA3Model();

    (model.tableRowHeadingLeft = '5%'),
      (model.tableRowHeadingRight = '32%'),
      (model.tableTdHeight = '171px');

    model.globalParameters = new Map();
    model.isSelfDataLoad = true;
    model.headers = [];
    model.items = [];
    model.rowHeaders = [];

    model.templateid = 'Template1';
    model.showArrowIcon = true;

    model.columnLength = 4;
    model.rowLength = 3;
    model.showProgressBar = true;

    model.headerCirlceClassFlag = false;
    return model;
  }

  static getEmptyItems(rows: number, columns: number): MatrixA3ItemModel[][] {
    let items = [];

    for (let i = 0; i < rows; i++) {
      let rowItems = [];
      for (let j = 0; j < columns; j++) {
        let itemModel = new MatrixA3ItemModel();
        itemModel.displayText = 0;
        itemModel.percentage = 0;
        itemModel.bottonText = 0;
        itemModel.iconname = '';
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
  headers: MatrixA3HeaderItemModel[];
  rowHeaders: MatrixA3RowHeadingItemModel[];
  items: MatrixA3ItemModel[][];
  showArrowIcon: boolean;
  headerCirlceClassFlag: boolean;
}

export class MatrixA3HeaderItemModel {
  constructor() {
    this.headerText = '';
  }
  headerText: string;
  headerValue: string;
}

export class MatrixA3RowHeadingItemModel {
  constructor() {
    this.rowIcon = '';
    this.rowText = '';
    this.rowIconColor = '';
  }

  rowText: string;
  rowIcon: string;
  rowIconColor: string;
  displayRowHeaderText: string;
}

export class MatrixA3ItemModel {
  displayText?: number;
  filterValue?: string;
  percentage?: number;
  bottonText?: number;
  rowArrowIcon?: string;
  rowArrowColor?: string;
  bottomCenterText?: string;
  text1?: string;
  text2?: string;
  iconname?: string;
  iconcolor?: string;
  isRatioChartColumn: boolean;
  ratioChartCount1?: number;
  ratioChartCount2?: number;
  ratioChartCount1Color?: string;
  ratioChartCount2Color?: string;
  ratioChartLabel1?: string;
  ratioChartLabel2?: string;
  ratioChartlabelColor?: string;
}

export enum CLICK_EVENT {
  ON_BOTTOM_TEXT = 'ON_BOTTOM_TEXT',
  ON_CLICK = 'ON_CLICK',
  ON_CLICK_VAL1 = 'ON_CLICK_1',
  ON_CLICK_VAL2 = 'ON_CLICK_2',
  ON_CLICK_TEMPLATE3 = 'ON_CLICK_TEMPLATE3',
}
