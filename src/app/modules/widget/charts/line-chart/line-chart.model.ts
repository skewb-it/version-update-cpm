import { EventEmitter } from 'events';

export class LineChartConfigModel {
  static getInstance<T>(): LineChartConfigModel {
    let model = new LineChartConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();
}

export class LineChartDataModel {
  globalParameters: Map<any, any>;
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: LineChartData;
  promoterPrefix: any;
  static getInstance<T>(): LineChartDataModel {
    let model = new LineChartDataModel();
    model.isSelfDataLoad = false;
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export interface LineChartData {
  data: any,
  options: any
}
