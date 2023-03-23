import { EventEmitter } from 'events';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';

export class TrafficMangCostListConfigModel {
    static getInstance<T>(): TrafficMangCostListConfigModel {
      let model = new TrafficMangCostListConfigModel();
      return model
    }

    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();
    EventAction = new Map();
}

export class TrafficMangCostListModel {
    isGlobalParams: any;
    isSelfDataLoad: any;
    columnsToDisplay: any;
    globalParamterKeys: any;
    globalParameters: Map<any, any>;
    apireqdata: any;
    filterType: any;
    data:TrafficMangCostListResModel[];
    static getInstance<T>(): TrafficMangCostListModel {
      let model = new TrafficMangCostListModel();
      model.isSelfDataLoad = true;
      model.columnsToDisplay = undefined;
      model.globalParameters = new Map<any, any>()
      model.apireqdata = new TrafficMangCostListReqModel();
      return model;
    }
  }

  export class TrafficMangCostListReqModel {
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

  export class TrafficMangCostListResModel {
    tmType: string;
    description: string;
    quantity: number;
    amount: number;
    constructor() {
    }
  }
