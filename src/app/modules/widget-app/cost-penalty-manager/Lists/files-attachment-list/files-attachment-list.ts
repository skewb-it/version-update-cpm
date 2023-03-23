import { EventEmitter } from 'events';
import { MatTableHelper } from 'src/app/utility/mat-table.helper';

export class FilesAttachmentListDataModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  globalParameters: Map<any, any>;
  static getInstance<T>(): FilesAttachmentListDataModel {
    let model = new FilesAttachmentListDataModel();
    model.isSelfDataLoad = true;
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export class FilesAttachmentListConfigModel {
  static getInstance<T>(): FilesAttachmentListConfigModel {
    let model = new FilesAttachmentListConfigModel();
    return model;
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = 'REFRESH_DATA';

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();
}

export class FilesAttachmentListRequestModel {
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

export interface FilesAttachmentListRow {
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
