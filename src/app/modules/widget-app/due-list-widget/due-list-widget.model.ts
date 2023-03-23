import { EventEmitter } from 'events';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';

export class DueListConfigModel {
    static getInstance<T>(): DueListConfigModel {
      let model = new DueListConfigModel();
      return model
    }
  
    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
  
    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();
    EventAction = new Map();
  }

  export class DueListDataModel {
    isGlobalParams: any;
    isSelfDataLoad: any;
    columnsToDisplay: any;
    globalParamterKeys: any;
    globalParameters: Map<any, any>;
    apireqdata: any;
    filterType: any;
    Duelable:any;
    DuelistModel: DuelistModel[];
    static getInstance<T>(): DueListDataModel {
      let model = new DueListDataModel();
      model.isSelfDataLoad = true;
      model.columnsToDisplay = undefined;
      model.globalParameters = new Map<any, any>()
      model.DuelistModel = [];
      model.Duelable="";
      return model;
    }
  }

  export class DuelistModel {
    label: string;
    count: number;
    MemberUID: number;
    Code: string;
    OrderNo: number;

    constructor() { }
  }
