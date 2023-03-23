import { EventEmitter } from 'events';

export class PCPRecordInvoiceAmountConfigModel {
    static getInstance<T>(): PCPRecordInvoiceAmountConfigModel {
      let model = new PCPRecordInvoiceAmountConfigModel();
      return model
    }
  
    public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
    CompToCaller = new EventEmitter();
    CallerToComp = new EventEmitter();
    EventAction = new Map();
}

export class PCPRecordInvoiceAmountDataModel {
    isGlobalParams: any;
    isSelfDataLoad: any;
    globalParamterKeys: any;
    globalParameters: Map<any, any>;
    apireqdata: any;
    data = new PCPRecordInvoiceAmountResModel();
    static getInstance<T>(): PCPRecordInvoiceAmountDataModel {
      let model = new PCPRecordInvoiceAmountDataModel();
      model.isSelfDataLoad = false;
      model.globalParameters = new Map<any, any>()
      return model;
    }
  }

  export class PCPRecordInvoiceAmountResModel {
    permitType: string;
    invoiceDescription: string;
    invoiceDetailsLoggedBy: string;
    permitNumber: string;
    invoiceAmount: number;
  }