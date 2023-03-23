import { EventEmitter } from 'events';

export class PCPChargeHistoryConfigModel {

  static getInstance<T>(): PCPChargeHistoryConfigModel {
    let model = new PCPChargeHistoryConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA";

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class PCPChargeHistoryDataModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  globalParamterKeys: any;
  globalParameters: Map<any, any>;
  data: any;

  static getInstance<T>(): PCPChargeHistoryDataModel {
    let model = new PCPChargeHistoryDataModel();
    model.isSelfDataLoad = false;
    model.globalParameters = new Map<any, any>();;
    model.data = [];
    return model;
  }
}
