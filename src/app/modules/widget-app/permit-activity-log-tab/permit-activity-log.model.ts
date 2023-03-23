import { EventEmitter } from 'events';

export class PermitActivityLogConfigModel {
  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();

  static getInstance<T>(): PermitActivityLogConfigModel {
    const model = new PermitActivityLogConfigModel();
    return model;
  }
}

export class PermitActivityLogModel {
  isSelfDataLoad: boolean;
  globalParameters: Map<string, any>;
  apiDataUrl: string;
  widgetinstanceid: number;
  widgetStyle:{ timelineDateStyle:any; timeDetailStyle:any;
  timelineBadgeStyle:any;timelineBeforAfterStyle:any;timelinePanelStyle:any;
  containerStyle:any;scrollbar:any;}
  items: PermitActivityLogItemDataModel[];
  static getInstance<T>(): PermitActivityLogModel {
    const model = new PermitActivityLogModel();
    model.globalParameters = new Map();
    model.isSelfDataLoad = true;
    model.apiDataUrl = '';
    model.items = [];
    model.widgetStyle = {
      timelineDateStyle:{ 'margin-left': '5%'}, 
      timeDetailStyle:{'margin-left': '8%'},
      timelineBadgeStyle: "",
      timelineBeforAfterStyle:false,
      timelinePanelStyle:"",
      containerStyle:"",
      scrollbar:false
    }
    return model;
  }
}

export class PermitActivityLogItemDataModel {
  actionDate: string;
  createDate: string;
  createdBy: string;
  details: string;
  event: string;
  internalDisplayName: string;
  internalUsername: string;
  objectReference: string;
  topic: string;
  updateDate: string;
  updateDateTime: string;
  updateId: number;
  updatedBy: string;
  username: string;
  workHistoryId: number;
  workId: number;
  workReferenceNumber: string;
}
