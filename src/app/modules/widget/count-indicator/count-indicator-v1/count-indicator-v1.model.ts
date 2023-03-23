import { EventEmitter } from 'events';
import { WidgetConstants } from 'src/app/constants/widget-constants';

export class CountIndicatorV1ConfigModel {
  static getInstance<T>(): CountIndicatorV1ConfigModel {
    let model = new CountIndicatorV1ConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
  public static readonly COMP_TO_CALLER_COUNT_CLICKED = WidgetConstants.COUNT_CLICKED;

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();
}

export class CountIndicatorV1DataModel {
  globalParameters: Map<any, any>;
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: CountIndicatorV1Data;
  promoterPrefix: any;
  static getInstance<T>(): CountIndicatorV1DataModel {
    let model = new CountIndicatorV1DataModel();
    model.isSelfDataLoad = false;
    model.globalParameters = new Map<any, any>();
    model.data = new CountIndicatorV1Data();
    return model;
  }
}

export class CountIndicatorV1Data {

  widgetStyle: any;
  countStyle: any;
  labelStyle: any;
  count: any;
  lable: string;

  constructor() {
    this.widgetStyle = {
      'display': 'flex',
      'flex-direction': 'column'
    };
    this.countStyle = {
      // 'width': '70px',
      // 'max-width': '70px',
      'padding' : '15px',
      'height': '70px',
      'display': 'flex',
      'justify-content': 'center',
      'align-items': 'center',
      'color': '#fff',
      'background-color': '#ffb300',
      'font-size': '35px',
      'border-radius': '4px',
      'margin-bottom': '10px'
    };
    this.labelStyle = {
      'font-size': '15px',
      'font-weight': 'bold'
    };
    this.count = 0;
    this.lable = "Test Text";
  }

}
