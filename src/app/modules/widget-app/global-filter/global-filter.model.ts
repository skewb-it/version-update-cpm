import { EventEmitter } from 'events';
import { FormModeConstant, WidgetConstants } from 'src/app/constants/widget-constants';

export class GlobalFilterConfigModel {

  static getInstance<T>(): GlobalFilterConfigModel {
    let model = new GlobalFilterConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
  public static readonly COMP_TO_CALLER_SHOW_ERROR = WidgetConstants.SHOW_ERROR;


  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class GlobalFilterDataModel {
  globalParameters: Map<any, any>;
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: any;
  mode: string;
  promoterPrefix: any;
  permission:any = {
     highwayAuthority: "n"
  }
  static getInstance<T>(): GlobalFilterDataModel {
    let model = new GlobalFilterDataModel();
    model.isSelfDataLoad = true;
    model.mode = FormModeConstant.ADD;
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

