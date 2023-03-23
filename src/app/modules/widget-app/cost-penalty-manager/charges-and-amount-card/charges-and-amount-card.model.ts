import { EventEmitter } from 'events';

export class ChargesAmountCardConfigModel {
  static getInstance<T>(): ChargesAmountCardConfigModel {
    let model = new ChargesAmountCardConfigModel();
    return model
  }
  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();
}

export class ChargesAmountCardDataModel {
  globalParameters: Map<any, any>;
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: ChargesAmountCardData;
  promoterPrefix: any;
  widgetStyle:{ height:any;}
  static getInstance<T>(): ChargesAmountCardDataModel {
    let model = new ChargesAmountCardDataModel();
    model.isSelfDataLoad = false;
    model.widgetStyle = {
        height:""
      }
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export interface ChargesAmountCardData {
  text:string,
  textColor: string,
  amount: number,
  amountColor: string,
}
