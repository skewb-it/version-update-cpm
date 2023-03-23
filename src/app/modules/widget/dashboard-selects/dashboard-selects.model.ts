import { EventEmitter } from 'events';

export class DashboardSelectsConfigModel {

  static getInstance<T>(): DashboardSelectsConfigModel {
    let model = new DashboardSelectsConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"


  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class DashboardSelectsDataModel {
  globalParameters: Map<any, any>;
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: DashboardSelectData[];
  promoterPrefix: any;
  static getInstance<T>(): DashboardSelectsDataModel {
    let model = new DashboardSelectsDataModel();
    model.isSelfDataLoad = false;
    model.globalParameters = new Map<any, any>();
    model.data = [];
    return model;
  }
}

export class DashboardSelectData {
  selectLable: string;
  shouldLoadOptionFromAPI: boolean;
  apiUrlForOptions: string;
  options: DashboardSelectOption[];
  constructor() {
    this.options = [];
  }
}

export class DashboardSelectOption {
  label: string;
  value: any;
  constructor() { }
}
