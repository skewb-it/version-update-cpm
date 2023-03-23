import { EventEmitter } from 'events';
import { WidgetConstants } from 'src/app/constants/widget-constants';

export class AddRecordInvoiceChargesConfigModel {
  static getInstance<T>(): AddRecordInvoiceChargesConfigModel {
    let model = new AddRecordInvoiceChargesConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = WidgetConstants.CALLER_TO_COMP_REFRESH_DATA;
  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();
}

export class AddRecordInvoiceChargesModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  globalParamterKeys: any;
  globalParameters: Map<any, any>;
  data: AddRecordInvoiceChargesDataModel;
  defaultSortDirection: string;

  static getInstance<T>(): AddRecordInvoiceChargesModel {
    let model = new AddRecordInvoiceChargesModel();
    model.data = new AddRecordInvoiceChargesDataModel();
    model.isSelfDataLoad = false;
    model.globalParamterKeys = [];
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export class AddRecordInvoiceChargesDataModel {
  invoiceNumber:any;
  invoiceDate:any;
  invoiceAmount:number;
  costType:any;
  invoiceDesc:any;
  chargesDesc:any;
}
