import { EventEmitter } from 'events';

export class ViewPermitInspectionConfigModel {
  static getInstance<T>(): ViewPermitInspectionConfigModel {
    let model = new ViewPermitInspectionConfigModel();
    return model
  }
  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();

}


export class ViewPermitInspectionDataModel {
  status(status: any) {
    throw new Error('Method not implemented.');
  }
  isGlobalParams: any;
  isSelfDataLoad: any;
  globalParameters: Map<any, any>;
  data: any;
  static getInstance<T>(): ViewPermitInspectionDataModel {
    let model = new ViewPermitInspectionDataModel();
    model.isSelfDataLoad = true;
    model.globalParameters = new Map<any, any>()
    return model;
  }
}
