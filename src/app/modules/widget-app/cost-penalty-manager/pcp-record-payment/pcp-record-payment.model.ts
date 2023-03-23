import { EventEmitter } from 'events';

export class PCPRecordPaymentConfigModel {

  static getInstance<T>(): PCPRecordPaymentConfigModel {
    let model = new PCPRecordPaymentConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"


  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class PCPRecordPaymentDataModel {
  globalParameters: Map<any, any>;
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: PCPRecordPaymentData;
  promoterPrefix: any;
  static getInstance<T>(): PCPRecordPaymentDataModel {
    let model = new PCPRecordPaymentDataModel();
    model.isSelfDataLoad = false;
    model.data = new PCPRecordPaymentData();
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export class  PCPRecordPaymentData
{
    paymentamount:string;
    paymentdate: string;



  constructor() { }
}
