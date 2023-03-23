import { EventEmitter } from 'events';
import { WidgetConstants } from 'src/app/constants/widget-constants';

export class PCPImagesAndFilesConfigModel {
  static getInstance<T>(): PCPImagesAndFilesConfigModel {
    let model = new PCPImagesAndFilesConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = WidgetConstants.CALLER_TO_COMP_REFRESH_DATA;

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();
}

export class PCPImagesAndFilesModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  globalParamterKeys: any;
  globalParameters: Map<any, any>;
  data: PCPImagesAndFilesDetailsModel[];
  defaultSortDirection: string;

  static getInstance<T>(): PCPImagesAndFilesModel {
    let model = new PCPImagesAndFilesModel();
    model.data = [];
    model.isSelfDataLoad = true;
    model.globalParamterKeys = [];
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export class PCPImagesAndFilesDetailsModel {
  fileId: any;
  workId: any;
  applicationId: any;
  fileRefId: any;
  filename: any;
  title: any;
  objectRefId: any;
  fileType: any;
  fileLinked: any;
  createDate: any;
  createdBy: any;  
  isImage: any;
  extension: any;
  imageBlob: any;
  imageSrc: any;
  iconName: any;
  fileSize: any;
}
