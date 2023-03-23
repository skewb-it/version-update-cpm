import { EventEmitter } from 'events';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';

export class PCPChargesListConfigModel {
  static getInstance<T>(): PCPChargesListConfigModel {
    let model = new PCPChargesListConfigModel();
    return model;
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = 'REFRESH_DATA';
  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();
}

export class PCPChargesListDataModel {
  header: string;
  headers: string[];
  isGlobalParams: any;
  isSelfDataLoad: any;
  columnsToDisplay: any;
  globalParamterKeys: any;
  globalParameters: Map<any, any>;
  apireqdata: any;
  filterType: any;
  data: PCPChargesListResponseModel[];
  // New added
  rowData: any;
  keys: string[];
  static getInstance<T>(): PCPChargesListDataModel {
    let model = new PCPChargesListDataModel();
    model.isSelfDataLoad = true;
    model.columnsToDisplay = undefined;
    model.globalParameters = new Map<any, any>();
    model.apireqdata = new PCPChargesListRequestModel();
    return model;
  }
}

export class PCPChargesListRequestModel {
  skip: number = 0;
  top: number = MatTableHelper.PAGE_SIZE;
  permitReferenceNumber: string;
  area: string;
  pageno: number = 0;
  sortOrder: string;
  sortField: string;
  costType: any;
  description: any;
  quantity: any;
  value: any;
  date: any;
  dueDate: any;
  status: any;

  constructor() {
    this.skip = this.pageno * this.top;
  }
}

export class PCPChargesListResponseModel {
  invoiceNumber: string;
  invoiceDate: Date;
  invoiceDesc: string;
  costType: string;
  chargesDesc: string;
  invoiceAmount: number;
  constructor() {}
}
