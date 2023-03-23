import { EventEmitter } from 'events';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';

export class PermitCommentsDataModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  globalParameters: Map<any, any>;
  static getInstance<T>(): PermitCommentsDataModel {
    let model = new PermitCommentsDataModel();
    model.isSelfDataLoad = true;
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export class PermitCommentsConfigModel {
  static getInstance<T>(): PermitCommentsConfigModel {
    let model = new PermitCommentsConfigModel();
    return model;
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = 'REFRESH_DATA';

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();
}

export class PermitCommentsRequestModel {
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

export interface PermitCommentsRow {
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
