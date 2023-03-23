import { EventEmitter } from 'events';

export class PCPRecordNegotiatedCostConfigModel {

  static getInstance<T>(): PCPRecordNegotiatedCostConfigModel {
    let model = new PCPRecordNegotiatedCostConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"


  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class PCPRecordNegotiatedCostDataModel {
  globalParameters: Map<any, any>;
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: PCPRecordNegotiatedCostData;
  promoterPrefix: any;
  static getInstance<T>(): PCPRecordNegotiatedCostDataModel {
    let model = new PCPRecordNegotiatedCostDataModel();
    model.isSelfDataLoad = false;
    model.data = new PCPRecordNegotiatedCostData();
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export class  PCPRecordNegotiatedCostData
{
    negotiatedamount:string;
    agreedbyhacontactname: string;



  constructor() { }
}
