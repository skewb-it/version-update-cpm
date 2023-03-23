import { EventEmitter } from 'events';

export class FpnChargeKeyDetailsConfigModel {
  static getInstance<T>(): FpnChargeKeyDetailsConfigModel {
    let model = new FpnChargeKeyDetailsConfigModel();
    return model;
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = 'REFRESH_DATA';

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();
}

export class FpnChargeKeyDetailsModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  globalParamterKeys: any;
  globalParameters: Map<any, any>;

  static getInstance<T>(): FpnChargeKeyDetailsModel {
    let model = new FpnChargeKeyDetailsModel();
    model.isSelfDataLoad = true;
    model.globalParamterKeys = [];
    model.globalParameters = new Map<any, any>();
    model.data = new ChargeOvervieDetailsModel();
    return model;
  }

  data: ChargeOvervieDetailsModel;
  defaultSortDirection: string;
}

export class ChargeOvervieDetailsModel {
  promoterPrefix: any;
  permitRefNumber: any;
  worksReferenceNumber: any;
  projectReferenceNumber: any;
  worksLocationDescription: any;
  locationdetails: any;
  postCode: any;
  usrn: any;
  worksDescription: any;
  worksCategory: any;
  highwayAuthority: any;
  roadType: any;
  promoterOrganisation: any;
  contact: any;
  workStream: any;
  accountability: any;
  trafficSensitive: any;
  footwayClosure: any;
  excavationRequired: any;
  isLaneRentalApplicable: any;
  trafficManagementRequired: any;
  trafficManagementPlan: any;
  permitStatus: any;
  workStatus: any;
  proposedStartDateTime: any;
  proposedEndDateTime: any;
  actualStartDateTime: any;
  validityEndDate: any;
  reasonablePeriodEndDate: any;
  actualEndDateTime: any;
  proposedDuration: any;
  cost: any;
  costRisk: any;
  customerRisk: any;
  trafficManagementRisk: any;
  geometry: any;
  actions: any[];
  expectedEndDateTime: any;
  collaborativeWorkingFlag: any;
  collaborationDetails: any;
  collaborativeWorks: any;
  collaborationType: any;
  activityType: any;
  ttro_requiredFlag: any;
  environmental_flag: any;
  is_covid19_response: any;
  earlyStartPreApprovalFlag: any;
  earlyStartReason: any;
  preApprovalAuthoriser: any;
  preApprovalDetails: any;
  is_pmr_responded: any;
  isDurationChallenged: any;
  applicationId: any;

  assesmentStatus:any;
  cooments:any;
}

export class AssessmentDecision {
  description: string;
  reason: string;
  status: string;
}

export class PermitProgreessToPAItem {
  InternalUserIdentifier: string;
  InternalUserName: string;
  WorkReferenceNumber: string;
  PermitReferenceNumber: string;
  PermitAlterationReferenceNumber: string;
}
//0: "proceed-to-pa"
// 1: "cancel"
// 2: "start"
// 3: "stop"
// 4: "alteration"
// 5: "extension-request"
// 6: "revert-start"
// 7: "revert-stop"
// 8: "register"
// 9: "new-permit"
