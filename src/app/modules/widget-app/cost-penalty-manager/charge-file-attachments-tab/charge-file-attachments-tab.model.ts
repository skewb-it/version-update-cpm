import { EventEmitter } from 'events';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';

export class ChargeFileAttachmentsDataModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  globalParameters: Map<any, any>;
  static getInstance<T>(): ChargeFileAttachmentsDataModel {
    let model = new ChargeFileAttachmentsDataModel();
    model.isSelfDataLoad = true;
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export class ChargeFileAttachmentsConfigModel {
  static getInstance<T>(): ChargeFileAttachmentsConfigModel {
    let model = new ChargeFileAttachmentsConfigModel();
    return model;
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = 'REFRESH_DATA';

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();
}

export class ChargeFileAttachmentsRequestModel {
  skip: number = 0;
  top: number = MatTableHelper.PAGE_SIZE;
  permitReferenceNumber: string;
  street: string;
  town: string;
  area: string;
  pageno: number = 0;

  constructor() {
    this.skip = this.pageno * this.top;
  }
}

export interface ChargeFileAttachmentsRow {
  Comment: string;
  CommentType: string;
  CommentBy: string;
  Date: string;
  CommentId: any;
  CommentRead: boolean;
  CommentReadBy: string;
  CommentReadDate: string;
  CommentReference: string;
  CommentSubmit: boolean;
  CommentTopic: string;
  UserDisplayName: string;
  CommentOrigin: string;
}
