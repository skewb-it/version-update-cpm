import { EventEmitter } from 'events';

export class DonutChartConfigModel {

  static getInstance<T>(): DonutChartConfigModel {
    let model = new DonutChartConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"


  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class DonutChartDataModel {
  globalParameters: Map<any, any>;
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: DonutChartData;
  promoterPrefix: any;
  static getInstance<T>(): DonutChartDataModel {
    let model = new DonutChartDataModel();
    model.isSelfDataLoad = false;
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export interface DonutChartData {
  data: any,
  options: any,
  isCenterLabelEnable: boolean,
  centerLabelColor: string,
  centerLabel: string
}
