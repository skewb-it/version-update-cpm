import { Injectable } from '@angular/core';
import { MasterDataModel } from '../models/common/master-data-model';
import { AppRepoService } from './app-repo.service';
import { ServerApiInterfaceServiceService } from './server-api-interface-service.service';
import { GLOBAL_PERSISTANT_DATA, MASTER_DATA_DOMAIN } from '../constants/app-repo.constants';
import { SessionStorageService } from './session-storage.service';
import { SESSION_STORAGE_DATA_KEY, FILTER_TYPE, GLOBAL_PARAM_KEY } from '../app-constants';
import { MASTER_DATA } from '../constants/db.constants';
import { AppFilterModel } from '../models/common/app-filter';


@Injectable({
  providedIn: 'root'
})
export class StartUpService {

  constructor(
    private _serverApi: ServerApiInterfaceServiceService,
    private _appRepoService: AppRepoService,
    private _sessionStorageService: SessionStorageService
  ) {
    this._appRepoService.appRepo.masterDataByDomain = new Map<string, MasterDataModel[]>();
    this._appRepoService.appRepo.masterDataByKey = new Map<string, MasterDataModel>();
    this._appRepoService.appRepo.masterDataByValue = new Map<string, MasterDataModel>();
  }

  Init() {
    const masterDataPromise = this.GetMasterData();
    const highwayAuthoritiesDataPromise = this.getOtherMasterData('/api/v1/highway-authorities', MASTER_DATA_DOMAIN.HIGHWAY_AUTORITIES.toString());
    const organizationDataPromise = this.getOtherMasterData('/api/v1/organisations-map', MASTER_DATA_DOMAIN.ORGANIZATIONS.toString());
    const departmentDataPromise = this.getOtherMasterData('/api/v1/departments', MASTER_DATA_DOMAIN.DEPARTMENTS.toString());
    let userId = this._sessionStorageService.getObject(SESSION_STORAGE_DATA_KEY.USER_NAME);
    const userInfoPromise = this.getUserInfoData(`/api/v1/user-details`);
    const allContractors = this.getOtherMasterData(`/api/v1/contractor/get-all-contractors`,MASTER_DATA_DOMAIN.CONTRACTOR.toString());
    const allWorkstream = this.getOtherMasterData(`/api/v1/workstream/get-all-workstream`,MASTER_DATA_DOMAIN.WORKSTREAM.toString());
    const workIdentifierDataPromise = this.getOtherMasterData(`/api/v1/works-identifier`, MASTER_DATA_DOMAIN.WORK_IDENTIFIER.toString());
    const filterGlobalParamsSetPromise = this.setAppGlobalPersistantStartupData();
    const helperTextData = this.getHelperTextData(`/api/v1/master-data/helper-info`);
    Promise.all([userInfoPromise, organizationDataPromise]).then((response)=>{
      this.setUserAccessiblePromoterOrg();
    });
    Promise.all([userInfoPromise]).then((response)=>{
      this.setUserAccessibleContractors();
      this.setUserAccessibleWorkStream();
    });
    return Promise.all([masterDataPromise,
      highwayAuthoritiesDataPromise,
      organizationDataPromise,
      departmentDataPromise,
      userInfoPromise,
      allWorkstream,
      allContractors,
      workIdentifierDataPromise,
      filterGlobalParamsSetPromise,
      helperTextData
    ])

   
  }

  setAppGlobalPersistantStartupData() {
    return new Promise((resolve, reject) => {
      let initFilterGlobalParams = new AppFilterModel();
      this._appRepoService.appRepo.appGlobalPersistantData.set(GLOBAL_PARAM_KEY.APP_FILTER, initFilterGlobalParams);
      resolve(0);
    });
  }

  GetMasterData() {
    return new Promise((resolve, reject) => {
      this._serverApi.get<any>('/api/v1/master-data').subscribe(resp => {
        if (resp) {
          this.SetMasterDataMap(resp);
          resolve(resp)
        }
      }, error => {
        reject()
      });
    });
  }

  getOtherMasterData(url: string, domainName: string) {
    return new Promise((resolve, reject) => {
      this._serverApi.get<any>(url).subscribe(resp => {
        if (resp) {
          let formattedRespWithDomainName = {};
          formattedRespWithDomainName[domainName] = resp;
          this.SetMasterDataMap(formattedRespWithDomainName);
          resolve(resp)
        }
      }, error => {
        reject()
      });
    });
  }

  getUserInfoData(url: string) {
    return new Promise((resolve, reject) => {
      this._serverApi.get<any>(url).subscribe(resp => {
        if (resp) {
          this._appRepoService.appRepo.masterDataByKey.set(MASTER_DATA.USER_INFO, resp);
          resolve(resp)
        }
      }, error => {
        reject()
      });
    });
  }

  SetMasterDataMap(response) {
    for (let key of Object.keys(response)) {
      this._appRepoService.appRepo.masterDataByDomain.set(key, response[key]);
      // TODO: will update this
      if (
        key != MASTER_DATA_DOMAIN.HIGHWAY_AUTORITIES.toString() ||
        key != MASTER_DATA_DOMAIN.ORGANIZATIONS.toString() ||
        key != MASTER_DATA_DOMAIN.DEPARTMENTS.toString() ||
        key != MASTER_DATA_DOMAIN.WORK_IDENTIFIER.toString()
      ) {
        response[key].forEach((element: any) => {
          this._appRepoService.appRepo.masterDataByKey.set(element.key, element);
          this._appRepoService.appRepo.masterDataByValue.set(element.value, element);
        });
      }
    }
  }

  getHelperTextData(url: string) {
    return new Promise((resolve, reject) => {
      this._serverApi.get<any>(url).subscribe(resp => {
        if (resp) {
          resp.forEach(element => {
            this._appRepoService.appRepo.helperTextDataById.set(element.helper_id, element);
          });
          resolve(resp)
        }
      }, error => {
        reject()
      });
    });
  }

  setUserAccessibleContractors(){
      let userAccessibleContractors = [];
      let userInfo: any = this._appRepoService.appRepo.masterDataByKey.get(MASTER_DATA.USER_INFO);

      if(userInfo == null || userInfo?.user_access_details == null) {
        return;
      };

      userInfo?.user_access_details.forEach(element => {
        element?.contractor.forEach((c:any) => {
          // let isContractorExist = userAccessibleContractors.find(uac=> uac.contractor_id == c.contractorId)
          // if(!isContractorExist)
          // {
            let contractor = {
              contractor_id: c.contractorId,
              contractor_name: c.contractorDisplayName,
              org_id: element.org_id
            }
            userAccessibleContractors.push(contractor);
          // }
        });
      });
      this._appRepoService.appRepo.masterDataByDomain.set(MASTER_DATA_DOMAIN.USER_ACCESS_CONTRACTOR.toString(), userAccessibleContractors);
      // let contractorIds = userAccessibleContractors.map(d=>d.contractor_id);
  }

 setUserAccessiblePromoterOrg(){
      let orgs = [];
      let userInfo: any = this._appRepoService.appRepo.masterDataByKey.get(MASTER_DATA.USER_INFO);
      let allOrg: any[] = this._appRepoService.appRepo.masterDataByDomain.get(MASTER_DATA_DOMAIN.ORGANIZATIONS.toString());

      if(!userInfo || !userInfo?.user_access_details || !allOrg) {
        return;
      };
     
      orgs = userInfo?.user_access_details.map(d=>{
        let promoterPrefix = allOrg.find(a=>a.orgId == d.org_id)?.swaOrgPrefix;
        return {
          orgId: d.org_id,
          name: d.org_name,
          promoterPrefix: promoterPrefix
        }
      });

      this._appRepoService.appRepo.masterDataByDomain.set(MASTER_DATA_DOMAIN.USER_ACCESS_ORG.toString(), orgs);
  }

  setUserAccessibleWorkStream(){
    let userAccessibleWorkStream = [];
    let userInfo: any = this._appRepoService.appRepo.masterDataByKey.get(MASTER_DATA.USER_INFO);

    if(userInfo == null || userInfo?.user_access_details == null) {
      return;
    };

    userInfo?.user_access_details.forEach(element => {
      element?.workstream.forEach((w:any) => {
       // let isContractorExist = userAccessibleWorkStream.find(uac=> uac.workstreamId == w.workstreamId)
        // if(!isContractorExist)
        // {
          let workstream = {
            org_id: element.org_id,
            workstreamId: w.workstreamId,
            description: w.description
          }
          userAccessibleWorkStream.push(workstream);
        // }
      });
    });
    this._appRepoService.appRepo.masterDataByDomain.set(MASTER_DATA_DOMAIN.USER_ACCESS_WROK_STREAM.toString(), userAccessibleWorkStream);
  }

}
