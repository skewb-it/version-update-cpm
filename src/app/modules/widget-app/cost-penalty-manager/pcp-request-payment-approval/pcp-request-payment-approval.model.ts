import { EventEmitter } from 'events';

export class PCPRequestPaymentApprovalConfigModel {
    static getInstance<T>(): PCPRequestPaymentApprovalConfigModel {
      let model = new PCPRequestPaymentApprovalConfigModel();
      return model
    }
  
    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();
    EventAction = new Map();
}

export class PCPRequestPaymentApprovalDataModel {
    isGlobalParams: any;
    isSelfDataLoad: any;
    globalParamterKeys: any;
    globalParameters: Map<any, any>;
    apireqdata: any;
    data = new PCPRequestPaymentApprovalResModel();
    static getInstance<T>(): PCPRequestPaymentApprovalDataModel {
      let model = new PCPRequestPaymentApprovalDataModel();
      model.isSelfDataLoad = false;
      model.globalParameters = new Map<any, any>()
      return model;
    }
  }

  export class PCPRequestPaymentApprovalResModel {
    permitType: string;
    invoiceDescription: string;
    invoiceDetailsLoggedBy: string;
  }