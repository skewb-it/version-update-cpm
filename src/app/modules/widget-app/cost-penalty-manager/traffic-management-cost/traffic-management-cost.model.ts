import { EventEmitter } from 'events';

export class TrafficManagementCostConfigModel {
    static getInstance<T>(): TrafficManagementCostConfigModel {
      let model = new TrafficManagementCostConfigModel();
      return model
    }
  
    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();
    EventAction = new Map();
}

export class TrafficManagementCostModel {
    isGlobalParams: any;
    isSelfDataLoad: any;
    globalParamterKeys: any;
    globalParameters: Map<any, any>;
    apireqdata: any;
    data = new TrafficManagementCostDataModel();
    static getInstance<T>(): TrafficManagementCostModel {
      let model = new TrafficManagementCostModel();
      model.isSelfDataLoad = false;
      model.globalParameters = new Map<any, any>()
      return model;
    }
  }

  export class TrafficManagementCostDataModel {
    chargeType: string;
    chargeDescription: string;
    loggedBy: string;
    totalCost: number;
    chargeAmount: number;
  }