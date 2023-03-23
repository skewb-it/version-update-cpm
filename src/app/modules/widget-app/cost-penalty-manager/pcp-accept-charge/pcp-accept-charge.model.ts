import { EventEmitter } from 'events';

export class PcpAcceptChargeConfigModel {

  static getInstance<T>(): PcpAcceptChargeConfigModel {
    let model = new PcpAcceptChargeConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"


  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class PcpAcceptChargeDataModel {
  globalParameters: Map<any, any>;
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: PcpAcceptChargeData;
  promoterPrefix: any;
  static getInstance<T>(): PcpAcceptChargeDataModel {
    let model = new PcpAcceptChargeDataModel();
    model.isSelfDataLoad = false;
    model.data = new PcpAcceptChargeData();
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export class  PcpAcceptChargeData
{

    notesaccompnyingacceptance: string;



  constructor() { }
}
