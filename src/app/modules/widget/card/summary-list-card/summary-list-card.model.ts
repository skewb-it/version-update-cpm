import { EventEmitter } from 'events';

export class SummaryListCardConfigModel {

  static getInstance<T>(): SummaryListCardConfigModel {
    let model = new SummaryListCardConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"


  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class SummaryListCardDataModel {
  globalParameters: Map<any, any>;
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: SummaryListCardData;
  promoterPrefix: any;
  static getInstance<T>(): SummaryListCardDataModel {
    let model = new SummaryListCardDataModel();
    model.isSelfDataLoad = false;
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export interface SummaryListCardData {
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
