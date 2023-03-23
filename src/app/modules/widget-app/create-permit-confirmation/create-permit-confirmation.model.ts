import { EventEmitter } from 'events';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';

export class PermitConfirmationConfigModel {
  static getInstance<T>(): PermitConfirmationConfigModel {
    let model = new PermitConfirmationConfigModel();
    return model
  }
  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();

}


export class PermitConfirmationDataModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  globalParameters: Map<any, any>;
  data: PermitConfirmationData;
  static getInstance<T>(): PermitConfirmationDataModel {
    let model = new PermitConfirmationDataModel();
    model.isSelfDataLoad = true;
    model.globalParameters = new Map<any, any>()
    model.data = new PermitConfirmationData();
    return model;
  }

}

export class PermitConfirmationData {
  permitReferenceNumber: string;
  totalCost: string;
  costRisk: number
  customerRisk: number
  trafficManagementRisk: number;
}
