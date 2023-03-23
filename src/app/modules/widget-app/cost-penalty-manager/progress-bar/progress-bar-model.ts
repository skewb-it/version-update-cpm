import { EventEmitter } from 'events';

export class ProgressBarConfigModel {
  static getInstance<T>(): ProgressBarConfigModel {
    let model = new ProgressBarConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();
}

export class ProgressBarDataModel {
    globalParameters: any;
    isGlobalParams: any;
    isSelfDataLoad: any;
    data: any;
    promoterPrefix: any;
    widgetStyle: any;
    widgetApiUrl:any;

    static getInstance<T>(): ProgressBarDataModel {
      let model = new ProgressBarDataModel();
      model.isSelfDataLoad = false;
      model.globalParameters = new Map<any, any>();
      return model;
    }
  }

  export interface ProgressBarData {
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
    value :number;
    valuecolor: string;
    backgroundColor: string,
    widgetStyle : any
  }
