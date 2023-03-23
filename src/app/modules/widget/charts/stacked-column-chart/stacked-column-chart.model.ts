import { EventEmitter } from 'events';

export class StackedColumnChartConfigModel {
  static getInstance<T>(): StackedColumnChartConfigModel {
    let model = new StackedColumnChartConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();
}

export class StackedColumnChartDataModel {
  globalParameters: Map<any, any>;
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: StackedColumnChartData;
  promoterPrefix: any;
  static getInstance<T>(): StackedColumnChartDataModel {
    let model = new StackedColumnChartDataModel();
    model.isSelfDataLoad = false;
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export interface StackedColumnChartData {
  data: any,
  options: any
}
