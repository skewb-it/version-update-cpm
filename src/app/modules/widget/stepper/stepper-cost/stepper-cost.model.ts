import { EventEmitter } from 'events';
import { WidgetConstants } from 'src/app/constants/widget-constants';

export class StepperCostConfigModel {
  static getInstance<T>(): StepperCostConfigModel {
    let model = new StepperCostConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA";
  public static readonly COMP_TO_CALLER_COUNT_CLICKED = WidgetConstants.COUNT_CLICKED;

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();
}


export class StepperCostDataModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  globalParamterKeys: any;
  globalParameters: Map<any, any>;
  isStatusShows:any;
  StepperCostfilterModel: StepperCostfilterModel[];

  static getInstance<T>(): StepperCostDataModel {
    let model = new StepperCostDataModel();
    model.isSelfDataLoad = false;
    model.isStatusShows = false;
    model.globalParameters = new Map<any, any>();
    model.StepperCostfilterModel = [];
    return model;
  }
}

export class StepperCostfilterModel {
  code: string;
  color: string;
  count: any;
  cost: number;
  countpercentage: string;
  countvisible: string;
  displayheadericon: string;
  display: string;
  iconname: string;
  name: string;
  producttypename: string;
  tasktypesequence: number;
  tasktypeuid: number;
  isValueVisible: string;
  isPercentageVisible: string;
  constructor() { }
}
