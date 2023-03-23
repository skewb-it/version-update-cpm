import { EventEmitter } from 'events';
import { WidgetConstants } from 'src/app/constants/widget-constants';

export class PCPStepperConfigModel {
  static getInstance<T>(): PCPStepperConfigModel {
    let model = new PCPStepperConfigModel();
    return model;
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = 'REFRESH_DATA';
  public static readonly COMP_TO_CALLER_COUNT_CLICKED =
    WidgetConstants.COUNT_CLICKED;

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();
}

export class PCPStepperDataModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  globalParamterKeys: any;
  globalParameters: Map<any, any>;
  PCPStepperfilterModel: PCPStepperfilterModel[];

  static getInstance<T>(): PCPStepperDataModel {
    let model = new PCPStepperDataModel();
    model.isSelfDataLoad = false;
    model.globalParameters = new Map<any, any>();
    model.PCPStepperfilterModel = [];
    return model;
  }
}

export class PCPStepperfilterModel {
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
  constructor() {}
}
