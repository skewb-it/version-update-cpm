import { EventEmitter } from 'events';

export class PermitMapConfigModel {
  static getInstance<T>(): PermitMapConfigModel {
    let model = new PermitMapConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();
}

export class PermitMapModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  globalParamterKeys: any;
  globalParameters: Map<any, any>;

  static getInstance<T>(): PermitMapModel {
    let model = new PermitMapModel();
    model.isSelfDataLoad = true;
    model.globalParamterKeys = [];
    model.globalParameters = new Map<any, any>();
    model.data = new PermitMapDataModel();
    return model;
  }
  
  data: PermitMapDataModel;
  defaultSortDirection: string;
}

export class PermitMapDataModel {
    special_designations: DesignationsModel[];
}

export class DesignationsModel {
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