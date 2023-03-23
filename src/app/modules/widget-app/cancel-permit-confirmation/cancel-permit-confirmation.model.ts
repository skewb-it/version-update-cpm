import { EventEmitter } from 'events';

export class PermitCancelConfirmConfigModel {

  static getInstance<T>(): PermitCancelConfirmConfigModel {
    let model = new PermitCancelConfirmConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"


  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class PermitCancelConfirmDataModel {
  globalParameters: Map<any, any>;
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: any;
  mode: string;
  promoterPrefix: any;
  apiDataUrl: any;
  static getInstance<T>(): PermitCancelConfirmDataModel {
    let model = new PermitCancelConfirmDataModel();
    model.isSelfDataLoad = false;
    model.data = new PermitCancelData();
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export class PermitCancelData {
  action: string;
  comments: string;
  cancellation_reason: string;
  constructor() {
    this.action = "cancel";
  }
}
