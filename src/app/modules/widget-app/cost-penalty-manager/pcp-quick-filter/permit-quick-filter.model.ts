import { EventEmitter } from 'events';
import { GLOBAL_PARAM_KEY } from 'src/app/app-constants';
import { WidgetConstants } from 'src/app/constants/widget-constants';

export class PCPPermitQuickFilterConfigModel {
  static getInstance<T>(): PCPPermitQuickFilterConfigModel {
    let model = new PCPPermitQuickFilterConfigModel();
    return model;
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = 'REFRESH_DATA';
  public static readonly COMP_TO_CALLER_APPLY_FILTER =
    WidgetConstants.APPLY_FILTER;

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();
}

export class PCPPermitQuickFilterDataModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  globalParamterKeys: any;
  globalParameters: Map<any, any>;
  quickFilters: QuickFilter[];
  appGlobalParamsKeyForQuickFilter: string;

  static getInstance<T>(): PCPPermitQuickFilterDataModel {
    let model = new PCPPermitQuickFilterDataModel();
    model.isSelfDataLoad = false;
    model.globalParameters = new Map<any, any>();
    model.quickFilters = [];
    model.appGlobalParamsKeyForQuickFilter = GLOBAL_PARAM_KEY.APP_FILTER;
    return model;
  }
}

export class QuickFilter {
  filterValue: string;
  label: string;
  count: number;
  icon: string;
  helperTitle: string;
  constructor() {}
}
