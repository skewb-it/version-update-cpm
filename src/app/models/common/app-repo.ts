import { MasterDataModel } from './master-data-model';


export class AppRepoModel {
  masterDataByDomain: Map<string, MasterDataModel[]> = new Map<string, MasterDataModel[]>();
  masterDataByKey: Map<string, MasterDataModel> = new Map<string, MasterDataModel>();
  masterDataByValue: Map<string, MasterDataModel> = new Map<string, MasterDataModel>();
  navigationData: Map<string, any> = new Map<string, any>();
  userInfo: any = new Map<string, any>();
  helperTextDataById: Map<any, any> = new Map<string, any>();
  appGlobalPersistantData: any = new Map<string, any>();
  appProductCode: string;
  constructor() {
  }
}
