import { EventEmitter } from 'events';

export class KPIChartConfigModel {

  static getInstance<T>(): KPIChartConfigModel {
    let model = new KPIChartConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"


  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class KPIChartDataModel {
  globalParameters: Map<any, any>;
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: KPIChartData;
  promoterPrefix: any;
  static getInstance<T>(): KPIChartDataModel {
    let model = new KPIChartDataModel();
    model.isSelfDataLoad = false;
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export interface KPIChartData {
  circleBorderColor: string,
  circleBackgroundColor: string,
  kpiColor: string,
  kpi: string,
  label: string,
  labelColor: string,
  kpiBackgroundColor: string
}
