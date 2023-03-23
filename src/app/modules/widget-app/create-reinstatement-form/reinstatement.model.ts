import { EventEmitter } from 'events';
import { FormModeConstant, WidgetConstants } from 'src/app/constants/widget-constants';

export class ReinstatementConfigModel {

  static getInstance<T>(): ReinstatementConfigModel {
    let model = new ReinstatementConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
  public static readonly COMP_TO_CALLER_SHOW_ERROR = WidgetConstants.SHOW_ERROR;

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class ReinstatementDataModel {
  globalParameters: Map<any, any>;
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: ReinstatementData;
  mode: string;
  promoterPrefix: any;
  static getInstance<T>(): ReinstatementDataModel {
    let model = new ReinstatementDataModel();
    model.isSelfDataLoad = true;
    model.data = new ReinstatementData();
    model.mode = FormModeConstant.ADD;
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export class ReinstatementData {
  reinstatementType: any;
  workLocationDescription: any;
  locationTypes: string[];
  siteLocationCordinatesEasting: number;
  siteLocationCordinatesNorthing: number;
  siteLocationCordinatesSecEasting: number;
  siteLocationCordinatesSecNorthing: number;
  length: number;
  width: number;
  depth: number;
  reinstatementDateTime: any;
  reinstatementState: any;
  finalSite: boolean;
  inspectionUnits: number;
  numberOfHoles: number;
}
