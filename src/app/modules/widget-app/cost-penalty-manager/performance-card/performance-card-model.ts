import { EventEmitter } from 'events';

export class PerformanceCardConfigModel {
  static getInstance<T>(): PerformanceCardConfigModel {
    let model = new PerformanceCardConfigModel();
    return model;
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = 'REFRESH_DATA';

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();
}

export class PerformanceCardDataModel {
  globalParameters: any;
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: PerformanceCardData[];

  promoterPrefix: any;
  widgetStyle: any;
  title1: any;
  widgetCardApi: any;

  static getInstance<T>(): PerformanceCardDataModel {
    let model = new PerformanceCardDataModel();
    model.isSelfDataLoad = false;
    model.title1 = 'defoult';
    // model.data[]=new PerformanceCardData[];
    // model.data = {
    // count:"10,000",
    // icon:"edit_note",
    // countColor:"#E62E2D",

    // text:"defoult",
    // backgroundColor: ''}
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export class PerformanceCardData {
  icon: string;
  text: string;
  count: string;
  countColor: string;
  backgroundColor: string;
}
