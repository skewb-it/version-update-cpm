import { EventEmitter } from 'events';

export class NavControlConfigModel {
  static getInstance<T>(): NavControlConfigModel {
    let model = new NavControlConfigModel();
    return model;
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = 'REFRESH_DATA';

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();
}

export class NavControlDataModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  globalParamterKeys: any;
  globalParameters: Map<any, any>;
  NavControls: NavControlModel[];

  static getInstance<T>(): NavControlDataModel {
    let model = new NavControlDataModel();
    model.isSelfDataLoad = false;
    model.globalParameters = new Map<any, any>();
    model.NavControls = [];
    return model;
  }
}

export class NavControlModel {
  titleIconName: string;
  titleIconColor: string;
  showTitleIcon: String;
  title: string;
  navigationRout: string;
  subNavControls: SubNavControlModel[];
  constructor() {}
}

export class SubNavControlModel {
  subTitle: string;
  subTitleIconName: string;
  showSubTitleIcon: string;
  subTitleIconColor: string;
  navigationRout: string;
}
