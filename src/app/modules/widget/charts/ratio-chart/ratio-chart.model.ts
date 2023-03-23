import { EventEmitter } from 'events';

export class RatioChartConfigModel {

  static getInstance<T>(): RatioChartConfigModel {
    let model = new RatioChartConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"


  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class RatioChartDataModel {
  globalParameters: Map<any, any>;
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: RatioChartData;
  promoterPrefix: any;
  static getInstance<T>(): RatioChartDataModel {
    let model = new RatioChartDataModel();
    model.isSelfDataLoad = false;
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export interface RatioChartData {
  entity1Count: number,
  entity2Count: number,
  entity1Color: string,
  entity2Color: string,
  label: string,
  labelColor: string,
  backgroundColor: string
}
