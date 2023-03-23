import { EventEmitter } from 'events';

export class DataDiffA3ConfigModel {
  static getInstance<T>(): DataDiffA3ConfigModel {
    let model = new DataDiffA3ConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class DataDiffA3Model {

  static getInstance<T>(): DataDiffA3Model {
    let model = new DataDiffA3Model();

    model.globalParameters = new Map();
    model.isSelfDataLoad = true;
    model.items = [];
    model.dataSource1 = [];
    model.dataSource2 = [];
    model.apiDataUrl = '';
    model.bindingStrategy = 1;
    model.format = "SideBySide"
    model.isTranspose = true;
    model.dataSource1Title = "";
    model.dataSource2Title = "";
    return model;
  }

  isSelfDataLoad: boolean;

  id: number;
  widgetinstanceid: number;
  globalParameters: Map<string, any>;
  apiDataUrl: string;

  items: any[] = [];
  apireqdata: any = {};

  bindingStrategy: number;
  dataSource1: any[];
  dataSource2: any[];
  format: string;
  isTranspose: boolean;
  dataSource1Title: string;
  dataSource2Title: string;

  widgetStyle: {};
  vlStyle: {};
}

export class DataDiffA3ColumnDataItemModel {
  constructor() {
    this.field = '';
    this.name = '';
  }
  field: string;
  name: string;
}

export enum CLICK_EVENT {
  ON_ITEM_CLICK = "item_click",
}
