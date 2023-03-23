import { EventEmitter } from 'events';
import { WidgetConstants } from 'src/app/constants/widget-constants';

export class AddTrafficMangCostConfigModel {
  static getInstance<T>(): AddTrafficMangCostConfigModel {
    let model = new AddTrafficMangCostConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = WidgetConstants.CALLER_TO_COMP_REFRESH_DATA;
  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();
}

export class AddTrafficMangCostModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  globalParamterKeys: any;
  globalParameters: Map<any, any>;
  data: AddTrafficMangCostDataModel;
  defaultSortDirection: string;

  static getInstance<T>(): AddTrafficMangCostModel {
    let model = new AddTrafficMangCostModel();
    model.data = new AddTrafficMangCostDataModel();
    model.isSelfDataLoad = false;
    model.globalParamterKeys = [];
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export class AddTrafficMangCostDataModel {
    tmType: string;
    description: string;
    quantity: number;
    amount: number;
  }
  