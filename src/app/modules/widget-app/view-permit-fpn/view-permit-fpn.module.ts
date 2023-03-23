import { EventEmitter } from 'events';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';

export class ViewPermitFpnConfigModel
{
  static getInstance<T>(): ViewPermitFpnConfigModel 
  {
      let model = new ViewPermitFpnConfigModel();
      return model
  }
  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();

}


export class ViewPermitFpnDataModel
{
  apiDataUrl: string;
  isGlobalParams:any;
  isSelfDataLoad:any;
  globalParameters:Map<any,any>;
  static getInstance<T>(): ViewPermitFpnDataModel {
      let model = new ViewPermitFpnDataModel();
      model.isSelfDataLoad = true;
      model.globalParameters = new Map<any,any>()
      model.data = new ViewFpnModel();
      return model;
  }
  data: any;
}

export class ViewPermitFpnModel
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

export class ViewFpnModel
{
  FPNNumber: string;
  WorksReferenceNumber: string;
  FPNStatus: string;
  Offencecode: string;
  OffenceDate: string;
  OffenceDetails: string;
}

export interface ViewPermitFpnRow 
{
  FPNNumber: string;
  WorksReferenceNumber: string;
  FPNStatus: string;
  Offencecode: string;
  OffenceDate: string;
  OffenceDetails: string;
}