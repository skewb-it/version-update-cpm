import { EventEmitter } from 'events';

export class PerformanceCard2ConfigModel {
  static getInstance<T>(): PerformanceCard2ConfigModel {
    let model = new PerformanceCard2ConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();
}

export class PerformanceCard2DataModel {
    globalParameters: any;
    isGlobalParams: any;
    isSelfDataLoad: any;
    data: any;
    promoterPrefix: any;
    widgetStyle: any;
    widgetCardApi: any;

    static getInstance<T>(): PerformanceCard2DataModel {
      let model = new PerformanceCard2DataModel();
      model.isSelfDataLoad = false;
      model.globalParameters = new Map<any, any>();
      return model;
    }
  }

  export interface PerformanceCard2Data {
    isIconEnable: boolean,
    isMatIcon: boolean,
    icon: string,
    iconColor: string,
    isTextEnable: boolean,
    text: string,
    textColor: string,
    isCountEnable: boolean,
    count: string,
    countColor: string,
    subtext:string,
    sbutext2:string,
    backgroundColor: string,
    widgetStyle : any
  }
