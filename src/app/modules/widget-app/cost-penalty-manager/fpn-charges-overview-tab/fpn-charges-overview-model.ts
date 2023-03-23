import { EventEmitter } from 'events';

export class FpnChargeOverviewConfigModel {
  static getInstance<T>(): FpnChargeOverviewConfigModel {
    let model = new FpnChargeOverviewConfigModel();
    return model;
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = 'REFRESH_DATA';

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();
}

export class FpnChargeOverviewModel {
  isGlobalParams: any;
  isFpnChargview: any;
  filterValue: any;
  isSelfDataLoad: any;
  isFPNpermit: any;
  globalParamterKeys: any;
  globalParameters: Map<any, any>;

  static getInstance<T>(): FpnChargeOverviewModel {
    let model = new FpnChargeOverviewModel();
    model.isSelfDataLoad = true;
    model.globalParamterKeys = [];
    model.globalParameters = new Map<any, any>();
    model.data = new FpnChargeOverviewDetailsModel();
    return model;
  }

  data: FpnChargeOverviewDetailsModel;
  defaultSortDirection: string;
}

export class FpnChargeOverviewDetailsModel {
  permitRefNumber: any;
  invoiceRefNumber: any;
  chargeNumber: any;
  worksLocationDescription: any;
  chargeDetails: any;
  chargeType: any;
  liabilityOrganisation: any;
  assignedBy: any;
  highwayAuthority: any;
  worksReferenceNumber: any;
  offenceCode:any;
  liabilityAssgned:any;
  fpnReferenceNumber:any;

  projectReferenceNumber: any;
  locationdetails: any;
  locationTypes: any;
  postCode: any;
  usrnDetails: any;
  fpnOffenceDetails:any;
  roadCategoryType1:any;
  worksDescription: any;
  worksCategory: any;
  network:any;
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
  actualEndDateTime: any;
  proposedDuration: any;
  cost: any;
  costRisk: any;
  customerRisk: any;
  trafficManagementRisk: any;
  geometry: any;
  actions: any[];
  changeDecision: any[];
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
  additionalInfo: any;
  additionalcontact: any;
  additionalcontactnumber: any;
  additionalcontactemail: any;
  is_excavation_carried_out: any;
  dcStatus: any;
  dcReason: any;
  dcResponseDate: any;
  emergencyNumber: string;
  emergencyContact: string;

  grantedDate:any;
  issuedDate:any;
  dateAccepted:any;
  dateFPNpaid:any;
  workType:any;
  spendType:any;
  costcode:any;
}

export class AssessmentDecision {
  description: string;
  reason: string;
  status: string;
  modificationRequestDetails: string;
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
