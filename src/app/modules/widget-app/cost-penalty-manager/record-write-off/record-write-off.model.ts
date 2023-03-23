import { EventEmitter } from 'events';

export class PCPRecordWriteOffConfigModel {

  static getInstance<T>(): PCPRecordWriteOffConfigModel {
    let model = new PCPRecordWriteOffConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"


  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();

}

export class PCPRecordWriteOffDataModel {
  globalParameters: Map<any, any>;
  isGlobalParams: any;
  isSelfDataLoad: any;
  data: PCPRecordWriteOffData;
  promoterPrefix: any;
  static getInstance<T>(): PCPRecordWriteOffDataModel {
    let model = new PCPRecordWriteOffDataModel();
    model.isSelfDataLoad = false;
    model.data = new PCPRecordWriteOffData();
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export class  PCPRecordWriteOffData
{
    writeoffamount:string;
    agreedbyhacontactname: string;



  constructor() { }
}
