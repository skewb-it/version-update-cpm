import { EventEmitter } from 'events';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';

export class EditPermitCostListConfigModel {
    static getInstance<T>(): EditPermitCostListConfigModel {
      let model = new EditPermitCostListConfigModel();
      return model
    }

    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
    public static readonly CALLER_TO_COMP_SET_DATA = "SET_DATA"
    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();
    EventAction = new Map();
}

export class EditPermitCostListDataModel {
    isGlobalParams: any;
    isSelfDataLoad: any;
    columnsToDisplay: any;
    globalParamterKeys: any;
    globalParameters: Map<any, any>;
    apireqdata: any;
    filterType: any;
    data:EditPermitCostListResponseModel[];
    static getInstance<T>(): EditPermitCostListDataModel {
      let model = new EditPermitCostListDataModel();
      model.isSelfDataLoad = false;
      model.columnsToDisplay = undefined;
      model.globalParameters = new Map<any, any>()
      model.apireqdata = new EditPermitCostListRequestModel();
      return model;
    }
  }

  export class EditPermitCostListRequestModel {
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

  export class EditPermitCostListResponseModel {
    costType: string;
    description: string;
    quantity: number;
    value: number;
    date: Date;
    dueDate: Date;
    status: string;
    constructor() {
    }
  }
