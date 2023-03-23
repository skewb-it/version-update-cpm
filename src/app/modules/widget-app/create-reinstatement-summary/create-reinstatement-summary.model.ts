import { EventEmitter } from 'events';

export class CreateReinstatementSummuryConfigModel {
  static getInstance<T>(): CreateReinstatementSummuryConfigModel {
    let model = new CreateReinstatementSummuryConfigModel();
    return model
  }
  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();
}

export class CreateReinstatementSummuryDataModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: CreateReinstatementSummuryData;
  globalParameters: Map<any, any>;
  static getInstance<T>(): CreateReinstatementSummuryDataModel {
    let model = new CreateReinstatementSummuryDataModel();
    model.isSelfDataLoad = true;
    model.data = new CreateReinstatementSummuryData();
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export class CreateReinstatementSummuryData {
  permitRefNumber :string;
  reinstatementStatus :string;
  numberOfHoles: number;
  reinstatementType: string;
  inspectionUnits: number;
  workReference: string;
  siteNo: string;
  length: number;
  width: number;
  depth: number;
  reinstatementDate: string;
  reinstatementEvidence: string;
  isFinalReinstatement: string;
  workLocation: string;
  locationDescription: string;
  locationTypes: string;
  constructor() { }
}
