import { EventEmitter } from 'events';
import { WidgetConstants } from 'src/app/constants/widget-constants';

export class PermitImagesAndFilesConfigModel {
  static getInstance<T>(): PermitImagesAndFilesConfigModel {
    let model = new PermitImagesAndFilesConfigModel();
    return model
  }

  public static readonly CALLER_TO_COMP_REFRESH_DATA = WidgetConstants.CALLER_TO_COMP_REFRESH_DATA;

  CompToCaller = new EventEmitter();
  CallerToComp = new EventEmitter();

  EventAction = new Map();
}

export class PermitImagesAndFilesModel {
  isGlobalParams: any;
  isSelfDataLoad: any;
  globalParamterKeys: any;
  globalParameters: Map<any, any>;
  data: PermitImagesAndFilesDetailsModel[];
  defaultSortDirection: string;

  static getInstance<T>(): PermitImagesAndFilesModel {
    let model = new PermitImagesAndFilesModel();
    model.data = [];
    model.isSelfDataLoad = true;
    model.globalParamterKeys = [];
    model.globalParameters = new Map<any, any>();
    return model;
  }
}

export class PermitImagesAndFilesDetailsModel {
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
