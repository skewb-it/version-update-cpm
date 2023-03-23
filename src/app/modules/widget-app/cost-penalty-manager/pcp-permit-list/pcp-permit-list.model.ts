import { FILTER_TYPE, JOURNEY_TYPE } from 'src/app/app-constants';

import { EventEmitter } from 'events';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';
import { WidgetConstants } from 'src/app/constants/widget-constants';

export class PCPPermitListConfigModel {

  static getInstance<T>(): PCPPermitListConfigModel {
    let model = new PCPPermitListConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA";
  public static readonly COMP_TO_CALLER_EDIT_PERMIT = WidgetConstants.EDIT_PERMIT;


  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class PCPPermitListDataModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  columnsToDisplay: any;
  globalParamterKeys: any;
  globalParameters: Map<any, any>;
  apireqdata: any;
  filterType: any;
  data: PCPPermitRow[];
  apiDataUrl:string;
  journeyType: any;

  static getInstance<T>(): PCPPermitListDataModel {
    let model = new PCPPermitListDataModel();
    model.isSelfDataLoad = false;
    model.columnsToDisplay = undefined;
    model.globalParameters = new Map<any, any>()
    model.apireqdata = new PCPPermitListRequestModel();
    model.filterType = FILTER_TYPE.ADVANCE_FILTER;
    model.journeyType = JOURNEY_TYPE.NONE;
    model.data = [];
    model.apiDataUrl = "/api/v1/cost-penalty/cost-quick-filter";
    return model;
  }
}

export class PCPPermitListRequestModel {
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

export class PCPPermitRow {

  permitNumber: string;
  address: string;
  permitStatus: string;
  costStatus: string;
  costType: any;
  costValueEstimated: number;
  costValueInvoiced: number;
  costValuePaid: number;

  constructor() {
  }

}
