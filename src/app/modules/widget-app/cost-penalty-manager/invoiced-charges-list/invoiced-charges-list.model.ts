import { EventEmitter } from 'events';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';

export class InvoiceChargesListConfigModel {
    static getInstance<T>(): InvoiceChargesListConfigModel {
      let model = new InvoiceChargesListConfigModel();
      return model
    }
  
    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();
    EventAction = new Map();
}

export class InvoiceChargesListDataModel {
    isGlobalParams: any;
    isSelfDataLoad: any;
    columnsToDisplay: any;
    globalParamterKeys: any;
    globalParameters: Map<any, any>;
    apireqdata: any;
    filterType: any;
    data:InvoiceChargesListResponseModel[];
    static getInstance<T>(): InvoiceChargesListDataModel {
      let model = new InvoiceChargesListDataModel();
      model.isSelfDataLoad = false;
      model.columnsToDisplay = undefined;
      model.globalParameters = new Map<any, any>()
      model.apireqdata = new InvoiceChargesListRequestModel();
      return model;
    }
  }

  export class InvoiceChargesListRequestModel {
    skip: number = 0;
    top: number = MatTableHelper.PAGE_SIZE;
    permitReferenceNumber: string;
    area: string;
    pageno: number = 0;
    sortOrder: string;
    sortField: string;
  
    constructor() {
      this.skip = this.pageno * this.top;
    }
  }

  export class InvoiceChargesListResponseModel {
    costType: string;
    description: string;
    matched:string;
    value: number;
    date: Date;
    dueDate: Date;
    status: string;
    constructor() {
    }
  }