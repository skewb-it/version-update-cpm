import { EventEmitter } from 'events';
import { FormModeConstant, WidgetConstants } from 'src/app/constants/widget-constants';
import { PermitFormPageData } from '../../page-layout/permit-listing/permit-listing.model';

export class PermitConfigModel {

  static getInstance<T>(): PermitConfigModel {
    let model = new PermitConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
  public static readonly COMP_TO_CALLER_SHOW_ERROR = WidgetConstants.SHOW_ERROR;


  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class PermitDataModel {
  globalParameters: Map<any, any>;
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: PermitFormPageData;
  mode: string;
  promoterPrefix: any;
  static getInstance<T>(): PermitDataModel {
    let model = new PermitDataModel();
    model.isSelfDataLoad = true;
    model.data = new PermitFormPageData();
    model.mode = FormModeConstant.ADD;
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export class Days{
  workingDay =  0
  calendarDays = 0
}

export class PermitCreateRequestBody {
  applicationId: any;
  workId: any;
  isAnOldPermit: any;
  workReferenceNumber: any;
  orgId: any;
  highwayAuthorityId: any;
  departmentId: any;
  permitRefNumber: any;
  streetName: any;
  areaName: any;
  town: any;
  postCode: any;
  usrn: any;
  roadCategory: any;
  locationDescription: any;
  proposedStartDate: any;
  proposedEndDate: any;
  actualStartDate: any;
  actualEnddate: any;
  reasonablePeriodEndDate: any;
  trafficSensitiveFlag: any;
  secondaryContact: any;
  secondaryContactNumber: any;
  secondaryContactEmail: any;
  locationTypes: any;
  workType: any;
  workCategory: any;
  workDescription: any;
  activityType: any;
  trafficManagementType: any;
  closeFootway: any;
  collaborativeWorkingFlag: any;
  collaborationDetails: any;
  collaborativeWorks: any;
  collaborationType: any;
  excavationFlag: any;
  environmentalFlag: any;
  ttro_requiredFlag: any;
  projectReferenceNumber: any;
  laneRentalFlag: any;
  specialDesignations: any;
  earlyStartPreApprovalFlag: any;
  earlyStartReason: any;
  preApprovalDetails: any;
  preApprovalAuthoriser: any;
  status: any;
  workStatus: any;
  assessmentDiscount: any;
  assessmentComments: any;
  assessmentStatus: any;
  alterationReason: any;
  draftApplicationId: any;
  draftAlterationId: any;
  draftWorkType: any;
  alterationStatus: any;
  pendingChangedetails: any;
  reasonsForRefusal: any;
  revokeReason: any;
  costRisk: any;
  customerRisk: any;
  trafficManagementRisk: any;
  accountability: any;
  paaCost: any;
  permitCost: any;
  variationCost: any;
  totalCost: any;
  calendarDays: any;
  workingDays: any;
  highwayAuthorityName: any;
  departmentName: any;
  promoterPrefix: any;
  promoterOrganisation: any;
  statusValue: any;
  workStatusValue: any;
  locationDetails: any;
  workOrderNo: any;
  conditions: any[];
  geometry: { coordinates: any; type: any; };
  customerRiskisk: number;
  permitReferenceNumber: any;
  constructor() { }
}

export class PermitData {
  // applicationId: number;
  // permitRefNumber: string;
  // worksLocationDescription: string;
  // workDescription: string;
  // worksType: string;
  // costRisk: string;
  // customerRisk: string;
  // trafficManagement: string;
  // startDate: string;
  // endDate: string;
  // permitStatus: string;
  // workStatus: string;
  // workStatusValue: string;
  // worksReferenceNumber: string;
  // highwayAuthority: string;
  // workstream: string;
  // promoterPrefix: string;
  // promoterOrganization: string;
  // projectReferenceNumber: string;
  // contact: string;
  // contactNumber: string;
  // proposedDuration: string;
  // roadType: string;
  // trafficSensitive: string;
  // footwayClosure: string;
  // footwayClosureDisplayText: string;
  // excavationRequired: string;
  // isLaneRentalApplicable: string;
  // trafficManagementRequired: string;
  // trafficManagReqDisplayText: string;
  // cost: string;
  // status: string;
  // locationdetails: any;
  // postCode: any;
  // usrn: any;
  // worksDescription: any;
  // worksCategory: any;
  // promoterOrganisation: any;
  // workStream: any;
  // accountability: any;
  // trafficManagementPlan: any;
  // proposedStartDateTime: any;
  // actualStartDateTime: any;
  // proposedEndDateTime: any;
  // actualEndDateTime: any;
  // trafficManagementRisk: any;
  // collaborativeType: string;
  // collaborativeWork: string;
  // collaborativeDetails: string;
  // collaborativeWorking: boolean;
  // geometry: any;
  // conditions:any[];
  environmental_flag:any;
  is_covid19_response:any;
  applicationId: any;
  workId: any;
  isAnOldPermit: any;
  workReferenceNumber: any;
  orgId: any;
  highwayAuthorityId: any;
  departmentId: any;
  permitRefNumber: any;
  streetName: any;
  areaName: any;
  town: any;
  postCode: any;
  usrn: any;
  roadCategory: any;
  locationDescription: any;
  proposedStartDate: any;
  proposedEndDate: any;
  actualStartDate: any;
  actualEnddate: any;
  reasonablePeriodEndDate: any;
  trafficSensitiveFlag: any;
  secondaryContact: any;
  secondaryContactNumber: any;
  secondaryContactEmail: any;
  locationTypes: any;
  workType: any;
  workCategory: any;
  workDescription: any;
  activityType: any;
  trafficManagementType: any;
  closeFootway: any;
  collaborativeWorkingFlag: any;
  collaborationDetails: any;
  collaborativeWorks: any;
  collaborationType: any;
  excavationFlag: any;
  environmentalFlag: any;
  ttro_requiredFlag: any;
  projectReferenceNumber: any;
  laneRentalFlag: any;
  specialDesignations: any;
  earlyStartPreApprovalFlag: any;
  earlyStartReason: any;
  preApprovalDetails: any;
  preApprovalAuthoriser: any;
  status: any;
  workStatus: any;
  assessmentDiscount: any;
  assessmentComments: any;
  assessmentStatus: any;
  alterationReason: any;
  draftApplicationId: any;
  draftAlterationId: any;
  draftWorkType: any;
  alterationStatus: any;
  pendingChangedetails: any;
  reasonsForRefusal: any;
  revokeReason: any;
  costRisk: any;
  customerRisk: any;
  trafficManagementRisk: any;
  accountability: any;
  paaCost: any;
  permitCost: any;
  variationCost: any;
  totalCost: any;
  calendarDays: any;
  workingDays: any;
  highwayAuthorityName: any;
  departmentName: any;
  promoterPrefix: any;
  promoterOrganisation: any;
  statusValue: any;
  workStatusValue: any;
  locationDetails: any;
  workOrderNo: any;
  worksLocationDescription: any;
  conditions: any[] = [];
  geometry: any;
  proposedDuration: any;
  constructor() { }
}
