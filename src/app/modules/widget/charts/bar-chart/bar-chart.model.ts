import { EventEmitter } from 'events';

export class BarChartConfigModel {

  static getInstance<T>(): BarChartConfigModel {
    let model = new BarChartConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"


  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class BarChartDataModel {
  globalParameters: Map<any, any>;
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: BarChartData;
  promoterPrefix: any;
  static getInstance<T>(): BarChartDataModel {
    let model = new BarChartDataModel();
    model.isSelfDataLoad = false;
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export interface BarChartData {
  data: any,
  options: any
}
