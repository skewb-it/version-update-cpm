import { EventEmitter } from '@angular/core';

export class CreatePermitSummuryConfigModel {
  static getInstance<T>(): CreatePermitSummuryConfigModel {
    let model = new CreatePermitSummuryConfigModel();
    return model
  }
  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();
}

export class CreatePermitSummuryDataModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: CreatePermitSummuryData;
  globalParameters: Map<any, any>;
  static getInstance<T>(): CreatePermitSummuryDataModel {
    let model = new CreatePermitSummuryDataModel();
    model.isSelfDataLoad = true;
    model.data = new CreatePermitSummuryData();
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export class CreatePermitSummuryData {
  promoterPrefix: string;
  permitReference: string;
  worksReferenceNumber: string;
  projectReferenceNumber: string;
  highwayAuthority: string;
  worksLocationDescription: string;
  locationDetails: string;
  postCode: string;
  usrn: string;
  worksDescription: string;
  worksType: string;
  accountability: string;
  roadType: string;
  promoterOrganisation: string;
  contact: string;
  workStream: string;
  proposedStartDate: string;
  proposedEndDate: string;
  actualStartDateTime: string;
  actualEndDateTime: string;
  duration: string;
  trafficSensitivity: string;
  footwayClosure: string;
  excavationRequired: string;
  isLaneRentalApplicable: string;
  trafficManagementRequired: string;
  cost: string;
  costRisk: string;
  customerRisk: string;
  trafficManagement: string;
  constructor() { }
}
