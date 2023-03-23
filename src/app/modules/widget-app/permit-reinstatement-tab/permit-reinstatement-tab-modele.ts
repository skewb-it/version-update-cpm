import { EventEmitter } from 'events';
import { WidgetConstants } from 'src/app/constants/widget-constants';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';

export class PermitReinstatementConfigModel
{
  static getInstance<T>(): PermitReinstatementConfigModel
  {
      let model = new PermitReinstatementConfigModel();
      return model
  }
  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA";
  public static readonly COMP_TO_CALLER_EDIT_REINSTATEMENT = WidgetConstants.EDIT_REINSTATEMENT;
  public static readonly COMP_TO_CALLER_VIEW_SITE_DETAILS = WidgetConstants.VIEW_SITE_DETAILS;
  public static readonly COMP_TO_CALLER_DELETE_REINSTATEMENT = WidgetConstants.DELETE_REINSTATEMENT;

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();

}


export class PermitReinstatementDataModel
{
  isGlobalParams:any;
  isSelfDataLoad:any;
  globalParameters:Map<any,any>;
  static getInstance<T>(): PermitReinstatementDataModel {
      let model = new PermitReinstatementDataModel();
      model.isSelfDataLoad = true;
      model.globalParameters = new Map<any,any>()
      return model;
  }
}

export class PermitReinstatementTabModel
{
  skip: number  = 0;
  top: number = MatTableHelper.PAGE_SIZE;
  permitReferenceNumber: string;
  street: string;
  town: string;
  area: string;
  pageno: number = 0;

  constructor(){
     this.skip = this.pageno * this.top;
  }

}


export interface PermitReinstatementResRow
{
    siteNumber: number;
    description: string;
    width: number;
    depth:number;
    length:number;
    dimentions:any;
    reinstatementDate:Date;
    reinstatementStatus:string;
    expiryDate:Date;
}
