import { EventEmitter } from 'events';

export class PermitCostCardConfigModel {
  static getInstance<T>(): PermitCostCardConfigModel {
    let model = new PermitCostCardConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();
}

export class PermitCostCardDataModel {
    globalParameters: Map<any, any>;
    isGlobalParams: any;
    isSelfDataLoad: any;
    data: PermitCostCardData;
    promoterPrefix: any;
    static getInstance<T>(): PermitCostCardDataModel {
      let model = new PermitCostCardDataModel();
      model.isSelfDataLoad = false;
      model.globalParameters = new Map<any, any>();
      return model;
    }
  }

export class PermitCostCardData {
    permitName:string;
    permitCount:string;
    costDetail:CostDetailData[];
}

export class CostDetailData {
    costName:string;
    costAmount:string;
}
