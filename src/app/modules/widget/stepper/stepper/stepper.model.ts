import { EventEmitter } from 'events';
import { WidgetConstants } from 'src/app/constants/widget-constants';

export class StepperConfigModel {
  static getInstance<T>(): StepperConfigModel {
    let model = new StepperConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA";
  public static readonly COMP_TO_CALLER_COUNT_CLICKED = WidgetConstants.COUNT_CLICKED;

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();
}


export class StepperDataModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  globalParamterKeys: any;
  globalParameters: Map<any, any>
  StepperfilterModel: StepperfilterModel[];

  static getInstance<T>(): StepperDataModel {
    let model = new StepperDataModel();
    model.isSelfDataLoad = false;
    model.globalParameters = new Map<any, any>();
    model.StepperfilterModel = [];
    return model;
  }
}

export class StepperfilterModel {
  code: string;
  color: string;
  count: any;
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
