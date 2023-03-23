import { EventEmitter } from 'events';
import { WidgetConstants } from 'src/app/constants/widget-constants';

export class PCPManagePrimaryDetailsConfigModel {

  static getInstance<T>(): PCPManagePrimaryDetailsConfigModel {
    let model = new PCPManagePrimaryDetailsConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA";
  public static readonly COMP_TO_CALLER_ACTION_BTN_CLICK = WidgetConstants.ACTION_BTN_CLICK;

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class PCPManagePrimaryDetailsDataModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  globalParamterKeys: any;
  globalParameters: Map<any, any>;
  data: any;

  static getInstance<T>(): PCPManagePrimaryDetailsDataModel {
    let model = new PCPManagePrimaryDetailsDataModel();
    model.isSelfDataLoad = false;
    model.globalParameters = new Map<any, any>();
    model.data = new PCPManagePrimaryDetail();
    return model;
  }
}

export class PCPManagePrimaryDetail {

  permitRefNumber: string;
  permitType: string;
  locationdetails: string;
  highwayAuthority: string;
  proposedStartDateTime: any;
  proposedEndDateTime: any;
  actualStartDateTime: any;
  actualEndDateTime: any;
  expectedEndDateTime: any;
  roadType:string;
  workStream:string;
  accountabilty:string;
  trafficSensitive:string;
  footwayClosure:string;
  excavationRequired:string;
  isLaneRentalApplicable:string;
  trafficManagementRequired:string;
  constructor() {
  }

}
