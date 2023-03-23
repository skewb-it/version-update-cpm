import { EventEmitter } from 'events';

export class CurrencyCardConfigModel {

  static getInstance<T>(): CurrencyCardConfigModel {
    let model = new CurrencyCardConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"


  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class CurrencyCardDataModel {
  globalParameters: Map<any, any>;
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: CurrencyCardData;
  promoterPrefix: any;
  static getInstance<T>(): CurrencyCardDataModel {
    let model = new CurrencyCardDataModel();
    model.isSelfDataLoad = false;
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export interface CurrencyCardData {
  backgroundColor: string,
  count: number,
  countColor: string,
  isLabelEnable: boolean,
  label: string,
  labelColor: string,
}
