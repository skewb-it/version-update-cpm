import { EventEmitter } from 'events';
import { WidgetConstants } from 'src/app/constants/widget-constants';

export class PCPManageActionsConfigModel {

  static getInstance<T>(): PCPManageActionsConfigModel {
    let model = new PCPManageActionsConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA";
  public static readonly COMP_TO_CALLER_ACTION_BTN_CLICK = WidgetConstants.ACTION_BTN_CLICK;

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class PCPManageActionsDataModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  globalParamterKeys: any;
  globalParameters: Map<any, any>;
  data: any;

  static getInstance<T>(): PCPManageActionsDataModel {
    let model = new PCPManageActionsDataModel();
    model.isSelfDataLoad = false;
    model.globalParameters = new Map<any, any>();;
    model.data = [];
    return model;
  }
}
