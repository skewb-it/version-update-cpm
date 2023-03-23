import { EventEmitter } from 'events';

export class DurationViewerChartConfigModel {
  static getInstance<T>(): DurationViewerChartConfigModel {
    let model = new DurationViewerChartConfigModel();
    return model
  }
  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();
}

export class DurationViewerChartDataModel {
  globalParameters: Map<any, any>;
  isGlobalParams: any;
  isSelfDataLoad: any;
  durationViewerStepper1Data: DurationViewerStepperData[];
  durationViewerStepper2Data: DurationViewerStepperData[];
  durationViewerData: DurationViewerData[];
  columnDisplay: ColumnDisplay[];
  durationViewerMap: Map<string, DurationViewerData[]> = new Map<string, DurationViewerData[]>();
  promoterPrefix: any;
  widgetStyle: { isShowChartLabels: any; headerWidth: any;isFirstColumnVisible:any }
  static getInstance<T>(): DurationViewerChartDataModel {
    let model = new DurationViewerChartDataModel();
    model.isSelfDataLoad = false;
    model.globalParameters = new Map<any, any>();
    model.durationViewerStepper2Data = [];
    model.durationViewerStepper1Data = [];
    model.columnDisplay = [];
    model.durationViewerData = [];
    model.durationViewerMap = new Map<string, DurationViewerData[]>();
    model.widgetStyle = {
      isShowChartLabels: true,
      isFirstColumnVisible:true,
      headerWidth: { 'width': '30%' }
    }
    return model;
  }
}

export class ColumnDisplay {
  tableHeader: string;
}

export class DurationViewerData {
  isIcon: boolean;
  iconName: string;
  iconColor: string;
  isChildNode: boolean;
}

export class DurationViewerStepperData {
  iconName: string;
  iconBgColor: string;
  nodeText:string;
  constructor() { }
}
