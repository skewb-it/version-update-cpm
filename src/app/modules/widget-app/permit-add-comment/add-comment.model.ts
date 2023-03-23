import { EventEmitter } from 'events';

export class PermitAddCommentConfigModel {

  static getInstance<T>(): PermitAddCommentConfigModel {
    let model = new PermitAddCommentConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"


  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class PermitAddCommentDataModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  columnsToDisplay: any;
  globalParamterKeys: any;
  globalParameters: Map<any, any>
  apireqdata: any;

  static getInstance<T>(): PermitAddCommentDataModel {
    let model = new PermitAddCommentDataModel();
    model.isSelfDataLoad = false;
    model.columnsToDisplay = undefined;
    model.globalParameters = new Map<any, any>();
    model.apireqdata = {}
    return model;
  }
}
