import { EventEmitter } from 'events';

export class ChallengPenaltyChargeConfigModel {

  static getInstance<T>(): ChallengPenaltyChargeConfigModel {
    let model = new ChallengPenaltyChargeConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"


  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class ChallengPenaltyChargeDataModel {
  globalParameters: Map<any, any>;
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: ChallengPenaltyChargeData;
  promoterPrefix: any;
  static getInstance<T>(): ChallengPenaltyChargeDataModel {
    let model = new ChallengPenaltyChargeDataModel();
    model.isSelfDataLoad = false;
    model.data = new ChallengPenaltyChargeData();
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export class  ChallengPenaltyChargeData
{

    reasonforchallenge: string;



  constructor() { }
}
