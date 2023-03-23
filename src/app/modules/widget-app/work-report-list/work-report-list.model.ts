import { EventEmitter } from 'events';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';

export class WorkListConfigModel {
    static getInstance<T>(): WorkListConfigModel {
      let model = new WorkListConfigModel();
      return model
    }
  
    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
  
    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();
    EventAction = new Map();
}

export class WorkListDataModel {
    isGlobalParams: any;
    isSelfDataLoad: any;
    columnsToDisplay: any;
    globalParamterKeys: any;
    globalParameters: Map<any, any>;
    apireqdata: any;
    filterType: any;
    static getInstance<T>(): WorkListDataModel {
      let model = new WorkListDataModel();
      model.isSelfDataLoad = true;
      model.columnsToDisplay = undefined;
      model.globalParameters = new Map<any, any>()
      model.apireqdata = new WorkListRequestModel();
      return model;
    }
  }

  export class WorkListRequestModel {
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