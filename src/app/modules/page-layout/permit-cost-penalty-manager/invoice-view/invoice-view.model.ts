import { EventEmitter } from 'events';

export class PermitViewConfigModel {
  static getInstance<T>(): PermitViewConfigModel {
    let model = new PermitViewConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();
}

export class PermitViewModel {
  static getInstance<T>(): PermitViewModel {
    let model = new PermitViewModel();
    model.data = new PermitViewDetailsModel();
    return model;
  }
  data: PermitViewDetailsModel;
  defaultSortDirection: string;
}

export class PermitViewDetailsModel {
  permitRefNumber: any;
}

export class PermitViewItemsModel {
  key: any;
  value1: any;
  value2:any;
}
