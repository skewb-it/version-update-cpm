import { EventEmitter } from 'events';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';

export class PermitInspectionListConfigModel {
  static getInstance<T>(): PermitInspectionListConfigModel {
    let model = new PermitInspectionListConfigModel();
    return model
  }
  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();

}


export class PermitInspectionListDataModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  apiDataUrl: any;
  globalParameters: Map<any, any>;
  static getInstance<T>(): PermitInspectionListDataModel {
    let model = new PermitInspectionListDataModel();
    model.isSelfDataLoad = true;
    model.globalParameters = new Map<any, any>()
    return model;
  }
}

export class PermitInspectionListReqModel {
  skip: number = 0;
  top: number = MatTableHelper.PAGE_SIZE;
  pageno: number = 0;
  constructor() {
    this.skip = this.pageno * this.top;
  }
}


export interface PermitInspectionRow {
  InspectionLoggedDate: string;
  WorksReferenceNumber: string;
  InspectionType: string;
  InspectionCategory: string;
  InspectionDate: string;
  InspectionOutcome: string;
  FailureReasons: string;
  InspectionStatus: string;
}
