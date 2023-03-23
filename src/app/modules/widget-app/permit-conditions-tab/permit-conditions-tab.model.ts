import { EventEmitter } from 'events';
import { FormModeConstant } from 'src/app/constants/widget-constants';

export class PermitConditionsConfigModel {
  static getInstance<T>(): PermitConditionsConfigModel {
    let model = new PermitConditionsConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();
}

export class PermitConditionsModel {
  globalParameters:Map<any,any>;
  static getInstance<T>(): PermitConditionsModel {
    let model = new PermitConditionsModel();
    model.data = new PermitConditionsDetailsModel();
    model.mode = FormModeConstant.ADD;
    model.globalParameters = new Map<any,any>()
    
    model.isSelfDataLoad = true;
    return model;
  }
  data: PermitConditionsDetailsModel;
  defaultSortDirection: string;
  mode: string;
  isSelfDataLoad: boolean;
}

export class PermitConditionsDetailsModel {
  conditions: PermitConditionsItem[];
}

export class PermitConditionsItem {
  condition: string;
  comment: string;
  code: string;
  description: string;
  suggested_text: string;
}