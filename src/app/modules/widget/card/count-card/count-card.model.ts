import { EventEmitter } from 'events';

export class CountCardConfigModel {

  static getInstance<T>(): CountCardConfigModel {
    let model = new CountCardConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"


  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class CountCardDataModel {
  globalParameters: Map<any, any>;
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: CountCardData;
  promoterPrefix: any;
  static getInstance<T>(): CountCardDataModel {
    let model = new CountCardDataModel();
    model.isSelfDataLoad = false;
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export interface CountCardData {
  isIconEnable: boolean,
  isMatIcon: boolean,
  icon: string,
  iconColor: string,
  isTextEnable: boolean,
  text: string,
  textColor: string,
  isCountEnable: boolean,
  isCountUnderlineEnable: boolean,
  count: string,
  countColor: string,
  backgroundColor: string,
  isLeftStripEnable: boolean,
  leftStripColor: string
}
