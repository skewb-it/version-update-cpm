import { FILTER_TYPE, JOURNEY_TYPE } from 'src/app/app-constants';

import { EventEmitter } from 'events';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';

export class InvoiceChargesListConfigModel {
  static getInstance<T>(): InvoiceChargesListConfigModel {
    let model = new InvoiceChargesListConfigModel();
    return model;
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = 'REFRESH_DATA';

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();
}

export class InvoiceChargesListDataModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  columnsToDisplay: any;
  globalParamterKeys: any;
  globalParameters: Map<any, any>;
  apireqdata: any;
  filterType: any;
  journeyType: any;
  apiUrls: InvoiceChargesListingAPIURL = new InvoiceChargesListingAPIURL();
  static getInstance<T>(): InvoiceChargesListDataModel {
    let model = new InvoiceChargesListDataModel();
    model.isSelfDataLoad = false;
    model.columnsToDisplay = undefined;
    model.globalParameters = new Map<any, any>();
    model.apireqdata = new InvoiceChargesListRequestModel();
    model.filterType = FILTER_TYPE.ADVANCE_FILTER;
    model.journeyType = JOURNEY_TYPE.NONE;
    return model;
  }
}

export class InvoiceChargesListRequestModel {
  skip: number = 0;
  top: number = MatTableHelper.PAGE_SIZE;
  permitReferenceNumber: string;
  street: string;
  town: string;
  area: string;
  pageno: number = 0;
  sortOrder: string;
  sortField: string;

  constructor() {
    this.skip = this.pageno * this.top;
  }
}

export interface ChargesRow {
  ApplicationId: number;
  PermitRefNumber: string;
  WorksLocationDescription: string;
  WorkDescription: string;
  WorkOrder: string;
  WorksType: string;
  CostRisk: string;
  CustomerRisk: string;
  TrafficManagement: string;
  DeemedDate: string;
  StartDate: string;
  EndDate: string;
  PermitStatus: string;
  WorkStatus: string;
  WorkStatusValue: string;
  WorksReferenceNumber: string;
  HighwayAuthority: string;
  Workstream: string;
  PromoterPrefix: string;
  PromoterOrganization: string;
  ProjectReferenceNumber: string;
  Contact: string;
  ProposedDuration: string;
  RoadType: string;
  TrafficSensitive: string;
  FootwayClosure: string;
  FootwayClosureDisplayText: string;
  ExcavationRequired: string;
  IsLaneRentalApplicable: string;
  TrafficManagementRequired: string;
  TrafficManagReqDisplayText: string;
  Cost: string;
  Status: string;
  // inactive_app_list:any;
  inactive_app_list: [];
}

export interface AppList {
  appId: string;
  permitRefNo: string;
  applistStatus: string;
}

export class InvoiceChargesListingAPIURL {
  advanceFilter: string = '';
  quickFilter: string = '';
  dynamicFilter: string = '';
}
