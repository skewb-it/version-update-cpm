import { EventEmitter } from 'events';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';

export class PermitFPNConfigModel
{
  static getInstance<T>(): PermitFPNConfigModel 
  {
      let model = new PermitFPNConfigModel();
      return model
  }
  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();

}


export class PermitFPNDataModel
{
  isGlobalParams:any;
  isSelfDataLoad:any;
  globalParameters:Map<any,any>;
  static getInstance<T>(): PermitFPNDataModel {
      let model = new PermitFPNDataModel();
      model.isSelfDataLoad = true;
      model.globalParameters = new Map<any,any>()
      return model;
  }
}

export class PermitFPNModel
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


export interface PermitFPNRow 
{
  FPNNumber: string;
  WorksReferenceNumber: string;
  FPNStatus: string;
  Offencecode: string;
  OffenceDate: string;
  OffenceDetails: string;
  FpnFiles:string;
  ImageBlob:Blob;
  ImageSrc:any;
  
  IssueDateAndTime: string;
  IssuingAuthority: string;
  AuthorisedOfficerName: string;  
  OfficerContactDetails: string;
  WorksPromoter: string;
  PromoterPrefix: string;
  WorkStream: string;
  StreetName: string;
  Town: string;
  PostCode: string;
  Accountability: string;
  AreaName: string;
  USRN: string;
  Cost: string;

}