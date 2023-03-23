import { EventEmitter } from 'events';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';

export class DataTableConfigModel {
    static getInstance<T>(): DataTableConfigModel {
      let model = new DataTableConfigModel();
      return model
    }

    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();
    EventAction = new Map();
}

export class DataTableDataModel {
    isGlobalParams: any;
    isSelfDataLoad: any;
    columnsToDisplay: any;
    globalParamterKeys: any;
    globalParameters: Map<any, any>;
    apireqdata: any;
    filterType: any;
    data:DataTableResponseModel[];
    static getInstance<T>(): DataTableDataModel {
      let model = new DataTableDataModel();
      model.isSelfDataLoad = true;
      model.columnsToDisplay = undefined;
      model.globalParameters = new Map<any, any>()
      model.apireqdata = new DataTableRequestModel();
      return model;
    }
  }

  export class DataTableRequestModel {
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

  export class DataTableResponseModel {
    invoiceNumber: string;
    invoiceDate: Date;
    invoiceDesc: string;
    costType: string;
    chargesDesc: string;
    invoiceAmount: number;
    constructor() {
    }
  }
