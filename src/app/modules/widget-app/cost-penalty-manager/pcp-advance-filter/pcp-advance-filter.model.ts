import { EventEmitter } from 'events';
import { GLOBAL_PARAM_KEY } from 'src/app/app-constants';
import { WidgetConstants } from 'src/app/constants/widget-constants';

export class PCPAdvanceFilterConfigModel {

  static getInstance<T>(): PCPAdvanceFilterConfigModel {
    let model = new PCPAdvanceFilterConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA";
  public static readonly COMP_TO_CALLER_APPLY_FILTER = WidgetConstants.APPLY_FILTER;
  public static readonly CALLER_TO_COMP_RESET_FILTER = WidgetConstants.RESET_TO_DEFAULT;

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class PCPAdvanceFilterDataModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  columnsToDisplay: any;
  globalParamterKeys: any;
  globalParameters: Map<any, any>
  apireqdata: any;
  appGlobalParamsKeyForAdvFilter: string;

  static getInstance<T>(): PCPAdvanceFilterDataModel {
    let model = new PCPAdvanceFilterDataModel();
    model.isSelfDataLoad = true;
    model.columnsToDisplay = undefined;
    model.globalParameters = new Map<any, any>();
    model.apireqdata = {};
    model.appGlobalParamsKeyForAdvFilter = GLOBAL_PARAM_KEY.APP_FILTER;
    return model;
  }
}
