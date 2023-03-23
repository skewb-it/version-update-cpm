import { PermitConditionsItem } from "src/app/modules/widget-app/permit-conditions-tab/permit-conditions-tab.model";

export class PermitNavigationDataModel {
  mapPageData: MapPageDataDataModel;
  conditionPageData: PermitConditionsPageModel;
  permitFormPageData: PermitFormPageData;
  areaName: string;
  constructor() {
    this.mapPageData = new MapPageDataDataModel();
    this.conditionPageData = new PermitConditionsPageModel();
    this.permitFormPageData = new PermitFormPageData();
  }
}

export class MapPageDataDataModel {
  geometry: any;
  nsgDetails: NSGDetails;

  constructor() {
    this.geometry;
    this.nsgDetails = new NSGDetails();
  }
}

export class NSGDetails {
  worksLocationDescription: any;
  location_details: any;
  postcode: any;
  usrn: any
  roadType: any;
  road_category: any
  highway_authority_name: any;
  authority_swa_code: any;
  special_designations: SpecialDesignationsModel[];
  traffic_sensitive: any;
  street_name: any;
  town: any;
  constructor() {
    this.special_designations = [];
  }
}

export class SpecialDesignationsModel {
  description: any;
  code: string;
  startTime: string;
  endTime: string;
  periodicityCode: string;
  asd_coordinate_geometry: any;
  special_desig_description: any;
  special_desig_end_date: any;
  special_desig_end_time: any;
  special_desig_location_text: any;
  special_desig_periodicity_code: any;
  special_desig_periodicity_code_string: any;
  special_desig_start_date: any;
  special_desig_start_time: any;
  street_special_desig_code: any;
  street_special_desig_code_string: any;
  whole_road: any;
  isChecked: boolean;
}

export class PermitConditionsPageModel {
  conditions: PermitConditionsItemModel[];
  constructor() {
    this.conditions = [];
  }
}

export class PermitConditionsItemModel {
  condition: string;
  comment: string;
}


export class PermitFormPageData {
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
  workDescTextType: any;
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
  geometry: any;
  roadType: any;
  conditions: PermitConditionsItem[];
  proposedDuration: any;
  cost: any;
  is_covid19_response: any;
  environmental_flag: any;
 is_pmr_responded: any;
 contractor_id:any;
 workstream_id:any;

  constructor() {

  }
}
