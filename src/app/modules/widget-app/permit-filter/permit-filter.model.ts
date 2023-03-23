import { EventEmitter } from 'events';
import { GLOBAL_PARAM_KEY } from 'src/app/app-constants';
import { WidgetConstants } from 'src/app/constants/widget-constants';

export class PermitFilterConfigModel {

  static getInstance<T>(): PermitFilterConfigModel {
    let model = new PermitFilterConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA";
  public static readonly COMP_TO_CALLER_APPLY_FILTER = WidgetConstants.APPLY_FILTER;

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class PermitFilterDataModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  columnsToDisplay: any;
  globalParamterKeys: any;
  globalParameters: Map<any, any>
  apireqdata: any;
  appGlobalParamsKeyForAdvFilter: string;

  static getInstance<T>(): PermitFilterDataModel {
    let model = new PermitFilterDataModel();
    model.isSelfDataLoad = true;
    model.columnsToDisplay = undefined;
    model.globalParameters = new Map<any, any>();
    model.apireqdata = {};
    model.appGlobalParamsKeyForAdvFilter = GLOBAL_PARAM_KEY.APP_FILTER;
    return model;
  }
}
