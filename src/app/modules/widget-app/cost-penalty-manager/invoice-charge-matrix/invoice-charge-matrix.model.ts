import { EventEmitter } from 'events';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';

export class InvoiceChargeMatrixConfigModel {
  static getInstance<T>(): InvoiceChargeMatrixConfigModel {
    let model = new InvoiceChargeMatrixConfigModel();
    return model;
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = 'REFRESH_DATA';
  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();
}

export class InvoiceChargeMatrixDataModel {
  header: string;
  headers: string[];
  isGlobalParams: any;
  isSelfDataLoad: any;
  columnsToDisplay: any;
  globalParamterKeys: any;
  globalParameters: Map<any, any>;
  apireqdata: any;
  filterType: any;
  data: InvoiceChargeMatrixResponseModel[];
  // New added
  rowData: any;
  keys: string[];
  static getInstance<T>(): InvoiceChargeMatrixDataModel {
    let model = new InvoiceChargeMatrixDataModel();
    model.isSelfDataLoad = true;
    model.columnsToDisplay = undefined;
    model.globalParameters = new Map<any, any>();
    model.apireqdata = new InvoiceChargeMatrixRequestModel();
    return model;
  }
}

export class InvoiceChargeMatrixRequestModel {
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

export class InvoiceChargeMatrixResponseModel {
  invoiceNumber: string;
  invoiceDate: Date;
  invoiceDesc: string;
  costType: string;
  chargesDesc: string;
  invoiceAmount: number;
  constructor() {}
}
