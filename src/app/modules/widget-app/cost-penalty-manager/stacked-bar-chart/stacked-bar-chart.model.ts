import { EventEmitter } from 'events';

export class StackedBarChartConfigModel {

  static getInstance<T>(): StackedBarChartConfigModel {
    let model = new StackedBarChartConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"


  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class StackedBarChartDataModel {
  globalParameters: Map<any, any>;
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: StackedBarChartData;
  promoterPrefix: any;
  chartInstance:any;
  widgetChartApi:string;
  showTable:any;
  static getInstance<T>(): StackedBarChartDataModel {
    let model = new StackedBarChartDataModel();
    model.isSelfDataLoad = true;
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export interface StackedBarChartData {
  data: any,
  options: any
}
