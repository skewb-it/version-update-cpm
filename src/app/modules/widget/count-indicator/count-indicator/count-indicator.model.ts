import { EventEmitter } from 'events';
import { WidgetConstants } from 'src/app/constants/widget-constants';

export class CountIndicatorConfigModel {
  static getInstance<T>(): CountIndicatorConfigModel {
    let model = new CountIndicatorConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
  public static readonly COMP_TO_CALLER_COUNT_CLICKED = WidgetConstants.COUNT_CLICKED;

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();
}

export class CountIndicatorDataModel {
  globalParameters: Map<any, any>;
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: CountIndicatorData;
  promoterPrefix: any;
  static getInstance<T>(): CountIndicatorDataModel {
    let model = new CountIndicatorDataModel();
    model.isSelfDataLoad = false;
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export interface CountIndicatorData {
  text: string,
  textColor: string,
  count: string,
  countColor: string,
  countBackground: string
}
