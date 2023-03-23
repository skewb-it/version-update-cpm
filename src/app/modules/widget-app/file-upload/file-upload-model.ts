import { EventEmitter } from 'events';

export class FileUploadConfigModel {
  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();
  EventAction = new Map();

  static getInstance<T>(): FileUploadConfigModel {
    const model = new FileUploadConfigModel();
    return model;
  }
}

export class FileUploadDataModel {
  isSelfDataLoad: boolean;
  globalParameters: Map<string, any>;
  apiDataUrl: string;
  widgetinstanceid: number;
  item: FileUploadItemDataModel;
  isGlobalParams: boolean;
  globalParamterKeys: string[];
  apireqdata: any = {};
  submitProperties: any = {};
  paramkeys : string[];
  

  static getInstance<T>(): FileUploadDataModel {
    const model = new FileUploadDataModel();
    model.globalParameters = new Map();
    model.isSelfDataLoad = false;
    model.apiDataUrl = '';
    model.item = new FileUploadItemDataModel();
    model.globalParamterKeys = [];
    model.paramkeys = [];
    model.isGlobalParams = false;
    model.submitProperties = Object();
    return model;
  }
}

export class FileUploadItemDataModel {
  // accept = "file_extension | audio/* | video/* | image/* | media_type"
  accept: string;
  // Maximum file size allowed in bytes.
  maxFileSize: number;
  multiple: boolean;
  url: string;
  // When enabled, upload begins automatically after selection is completed.
  auto: string;
}
