import { EventEmitter } from 'events';
import { FormModeConstant } from 'src/app/constants/widget-constants';

export class PermitDrawMapConfigModel {
  static getInstance<T>(): PermitDrawMapConfigModel {
    let model = new PermitDrawMapConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();
}

export class PermitDrawMapDataModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  globalParamterKeys: any;
  globalParameters: Map<any, any>;
  data: PermitDrawMapDetails;
  createPermitJSON: any;
  showSpecialDesignations: boolean;
  mode: any;

  static getInstance<T>(): PermitDrawMapDataModel {
    let model = new PermitDrawMapDataModel();
    model.isSelfDataLoad = false;
    model.globalParameters = new Map<any, any>();
    model.data = new PermitDrawMapDetails();
    model.createPermitJSON = new CreatePermitJSONModel();
    model.mode = FormModeConstant.ADD;
    model.showSpecialDesignations = true;
    return model;
  }
}

export class PermitDrawMapDetails {
  worksLocationDescription: any;
  location_details: any;
  postcode: any;
  usrn: any
  roadType: any;
  road_category: any
  highway_authority_name: any;
  authority_swa_code: any;
  special_designations: DesignationsModel[];
  traffic_sensitive: any;
  street_name: any;
  town: any;
  draft:boolean;
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

export class CreatePermitJSONModel {
  reverseGEOCode: any;
  overlayComplete: any;
  reverseGEOCodeRequest: any;
  geometry: GeometryModel;
  constructor() {
    this.geometry = new GeometryModel()
  }
}

export class GeometryModel {
  cordinateNorthingsEastings: any;
  coordinatesLatLng: GeometryModel;
  type: any;
}

export class MultiUsrns{
  usrnlist: UsrnListMOdel[];

}

export class UsrnListMOdel {
  usrn:string;
  usrnwithstreetname:string;
}