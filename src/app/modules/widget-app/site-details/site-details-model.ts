import { EventEmitter } from 'events';

export class SiteDetailsConfigModel {
  static getInstance<T>(): SiteDetailsConfigModel {
    let model = new SiteDetailsConfigModel();
    return model
  }
  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();

}


export class SiteDetailsDataModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  globalParameters: Map<any, any>;
  data: any;
  static getInstance<T>(): SiteDetailsDataModel {
    let model = new SiteDetailsDataModel();
    model.isSelfDataLoad = true;
    model.globalParameters = new Map<any, any>();
    model.data = new ViewSiteDetailsModel();
    return model;
  }
}


export class ViewSiteDetailsModel {
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
    isFinalReinstatement: boolean;
    workLocation: string;
    locationDescription: string;
    locationTypes: string;
}