import { EventEmitter } from 'events';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';

export class PermitChangeReqConfigModel
{
  static getInstance<T>(): PermitChangeReqConfigModel 
  {
      let model = new PermitChangeReqConfigModel();
      return model
  }
  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();

}


export class PermitChangeReqDataModel
{
  isGlobalParams:any;
  isSelfDataLoad:any;
  globalParameters:Map<any,any>;
  static getInstance<T>(): PermitChangeReqDataModel {
      let model = new PermitChangeReqDataModel();
      model.isSelfDataLoad = true;
      model.globalParameters = new Map<any,any>()
      return model;
  }
}

export class PermitChangeRequestTabModel
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


export interface PermitChangeRequestRow 
{
  Comment: string;
  CommentType: string;
  CommentBy: string;
  Date:string;
}