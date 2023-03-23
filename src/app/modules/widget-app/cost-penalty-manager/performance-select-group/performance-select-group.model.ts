import { EventEmitter } from 'events';
import {
  FormModeConstant,
  WidgetConstants,
} from 'src/app/constants/widget-constants';

export class PerformanceSelectGroupConfigModel {
  static getInstance<T>(): PerformanceSelectGroupConfigModel {
    let model = new PerformanceSelectGroupConfigModel();
    return model;
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = 'REFRESH_DATA';
  public static readonly COMP_TO_CALLER_SHOW_ERROR = WidgetConstants.SHOW_ERROR;

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();
}

export class PerformanceSelectGroupDataModel {
  globalParameters: Map<any, any>;
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: any;
  mode: string;
  promoterPrefix: any;
  permission: any = {
    highwayAuthority: 'w',
  };
  static getInstance<T>(): PerformanceSelectGroupDataModel {
    let model = new PerformanceSelectGroupDataModel();
    model.isSelfDataLoad = true;
    model.mode = FormModeConstant.ADD;
    model.globalParameters = new Map<any, any>();
    return model;
  }
}
