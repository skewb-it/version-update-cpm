import { EventEmitter } from 'events';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';

export class MultiTabConfigModel {
  static getInstance<T>(): MultiTabConfigModel {
    let model = new MultiTabConfigModel();
    return model;
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = 'REFRESH_DATA';
  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();
}

export class MutliTabDataModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  columnsToDisplay: any;
  globalParamterKeys: any;
  globalParameters: Map<any, any>;
  apireqdata: any;
  filterType: any;
  data: MutliTabResponseModel[];
  content: any;
  static getInstance<T>(): MutliTabDataModel {
    let model = new MutliTabDataModel();
    model.isSelfDataLoad = true;
    model.columnsToDisplay = undefined;
    model.globalParameters = new Map<any, any>();
    model.apireqdata = new MutliTabRequestModel();
    return model;
  }
}

export class MutliTabRequestModel {
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

export class MutliTabResponseModel {
  invoiceNumber: string;
  invoiceDate: Date;
  invoiceDesc: string;
  costType: string;
  chargesDesc: string;
  invoiceAmount: number;
  constructor() {}
}
