import { EventEmitter } from 'events';

export class PerformanceChartConfigModel {
  static getInstance<T>(): PerformanceChartConfigModel {
    let model = new PerformanceChartConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();
}

export class PerformanceChartDataModel {
    globalParameters: any;
    isGlobalParams: any;
    isSelfDataLoad: any;
    data:any;
    columndata:any;
    datakeys:any;
    promoterPrefix: any;
    widgetStyle: any;
    title1:any;
    bgcolor:any;
    widgettableApi:string;
    total:string;
    static getInstance<T>(): PerformanceChartDataModel {
      let model = new PerformanceChartDataModel();
      model.isSelfDataLoad = true;

      model.data = [];

      model.globalParameters = new Map<any, any>();
      return model;
    }
  }

  export class  PerformanceChartData {

    name: string;
    data:string;


  }


