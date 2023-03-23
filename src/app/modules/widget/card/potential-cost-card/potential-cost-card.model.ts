import { EventEmitter } from 'events';

export class PotentialCostCardConfigModel {

  static getInstance<T>(): PotentialCostCardConfigModel {
    let model = new PotentialCostCardConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"


  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class PotentialCostCardDataModel {
  globalParameters: Map<any, any>;
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: PotentialCostCardData;
  promoterPrefix: any;
  static getInstance<T>(): PotentialCostCardDataModel {
    let model = new PotentialCostCardDataModel();
    model.isSelfDataLoad = false;
    model.globalParameters = new Map<any, any>();
    model.data = new PotentialCostCardData();
    return model;
  }
}

export class PotentialCostCardData {
  isIconEnable: boolean;
  isMatIcon: boolean;
  cost: number;
  costColor: string;
  icon: string;
  iconColor: string;
  label1: string;
  label1Color: string;
  label2: string;
  label2Color: string;
  backgroundColor: string;

  constructor() {
    this.isIconEnable = true;
    this.isMatIcon = true;
    this.cost = 0;
    this.costColor = '--white';
    this.icon = 'warning';
    this.iconColor = '--white';
    this.label1 = '-';
    this.label1Color = '--white';
    this.label2 = '-';
    this.label2Color = '--white';
    this.backgroundColor = '--theme-color';
  }
}
