import { EventEmitter } from 'events';

export class ViewPermitCommentConfigModel {
  static getInstance<T>(): ViewPermitCommentConfigModel 
  {
      let model = new ViewPermitCommentConfigModel();
      return model
  }
  public static readonly CALLER_TO_COMP_REFRESH_DATA = "REFRESH_DATA"
  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();
}

export class ViewPermitCommentsDataModel {
  apiDataUrl: string;
  isGlobalParams:any;
  isSelfDataLoad:any;
  data: ViewCommentDataModel;
  globalParameters:Map<any,any>;
  static getInstance<T>(): ViewPermitCommentsDataModel {
      let model = new ViewPermitCommentsDataModel();
      model.isSelfDataLoad = true;
      model.globalParameters = new Map<any,any>()
      model.data = new ViewCommentDataModel();
      return model;
  }
}

export class ViewCommentDataModel {
    permitDetails?:PermitDetails;
    commentsDetails?:any;
    otherDetails?:OtherDetails;
}

export class PermitDetails {
    promoterOrg: string;
    workStreamPrefix: string;
    workReferenceNumber: string;
    workLocaionDesc: string;
    highwayAuthority: string;
    streetName: string;
    areaName:string;
    townName:string;
    usrnNo:string;
}

export class CommentsDetails {
    commentId:any;
    comment: string;
    commentType: string;
    commentBy: string;
    date:string;
    commentRead:boolean;
    commentReadBy: string;
    commentReadDate: string;
    commentReference: string;
    commentSubmit: boolean;
    commentTopic: string;
    userDisplayName: string;
    commentOrigin:string;
}

export class OtherDetails {
    readBy:string;
    readOn:string;
    closedOn:string;
    closedBy:string;
    closureRemarks:string;
}