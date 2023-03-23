import { EventEmitter } from 'events';
import { GLOBAL_PARAM_KEY } from 'src/app/app-constants';
import { WidgetConstants } from 'src/app/constants/widget-constants';

export class PermitQuickFilterConfigModel {

  static getInstance<T>(): PermitQuickFilterConfigModel {
    let model = new PermitQuickFilterConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
  public static readonly COMP_TO_CALLER_APPLY_FILTER = WidgetConstants.APPLY_FILTER;

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class PermitQuickFilterDataModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  apiDataUrl:string;
  globalParamterKeys: any;
  globalParameters: Map<any, any>
  quickFilters: QuickFilter[];
  appGlobalParamsKeyForQuickFilter: string;


  static getInstance<T>(): PermitQuickFilterDataModel {
    let model = new PermitQuickFilterDataModel();
    model.isSelfDataLoad = true;
    model.globalParameters = new Map<any, any>();
    model.quickFilters = [];
    model.apiDataUrl =  "/api/v1/applications/quick-filter-count";
    model.appGlobalParamsKeyForQuickFilter = GLOBAL_PARAM_KEY.APP_FILTER;
    return model;
  }
}

export class QuickFilter {
  filterValue: string;
  label: string;
  count: number;
  icon: string;
  helperTitle:string;
  constructor() { }
}
