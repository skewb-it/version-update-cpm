import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { element } from 'protractor';
import {  GLOBAL_PERSISTANT_DATA, PRODUCT_SERVICES } from '../constants/app-repo.constants';
import { MASTER_DATA, MASTER_DATA_DOMAIN, PERMIT_ACTIONS_CONFIG } from '../constants/db.constants';
import { AppRepoService } from './app-repo.service';

@Injectable({
  providedIn: 'root'
})

export class AppRepoHelperService {
  constructor(public _appRepoService: AppRepoService,
    @Inject(LOCALE_ID) private locale: string) { }

  // master data
  getMDataByDomain(categoryCode: string) {
    return this._appRepoService.appRepo.masterDataByDomain.get(categoryCode);
  }

  getMDataByKey(key: string) {
    return this._appRepoService.appRepo.masterDataByKey.get(key);
  }

  getMDataByValue(value: string) {
    return this._appRepoService.appRepo.masterDataByValue.get(value);
  }

  getMDataByName(list: any, name: string) {
    return list.find(d => d.name.indexOf(name) > 0);
  }

  getMDataDisplayTextByValue(value: string) {
    let masterData = this._appRepoService.appRepo.masterDataByValue.get(value);
    return masterData?.displayText;
  }

  // navigation
  setNavigationData(key, value) {
    this._appRepoService.appRepo.navigationData.set(key, value)
  }
  getNavigationData(key) {
    return this._appRepoService.appRepo.navigationData.get(key)
  }

  getUserAccessibleWorkStream(){
    return this._appRepoService.appRepo.masterDataByDomain.get(MASTER_DATA_DOMAIN.USER_ACCESS_WROK_STREAM);
  }

  getUserAccessibleContractors(){
    return this._appRepoService.appRepo.masterDataByDomain.get(MASTER_DATA_DOMAIN.USER_ACCESS_CONTRACTOR);
  }

  getWorkIdentifiersByOrg(orgId, worksteamId){
    let arrWorkIdentifiers = this._appRepoService.appRepo.masterDataByDomain.get(MASTER_DATA_DOMAIN.WORK_IDENTIFIER.toString());
    // let userInfo: any = this._appRepoService.appRepo.masterDataByKey.get(MASTER_DATA.USER_INFO);

    if(arrWorkIdentifiers && arrWorkIdentifiers.length == 0) return [];

    let filteredWorkIdentifiers = arrWorkIdentifiers.filter((d:any)=>{
      return d.orgId == orgId && d.worksteamId == worksteamId
    })

    return filteredWorkIdentifiers;
  }

  hasPermitActionPermission(actionName:PERMIT_ACTIONS_CONFIG, actions?:any[]) {
    let appProductCode:any = this._appRepoService.appRepo.appProductCode;
    let flag = this.productCodePermission(actionName,appProductCode);
    if(flag == false){
        return false;
    }else{
        if(actions && actions.length > 0 &&
            !([ PERMIT_ACTIONS_CONFIG.ADD_NEW_COMMENT, PERMIT_ACTIONS_CONFIG.ADD_REINSTATEMENT].indexOf(actionName)+1 && actionName))
          {
            return actions.indexOf(actionName?.toString()) >= 0;
          }else{
              return true;
          }
    }
  }

  productCodePermission(actionName:PERMIT_ACTIONS_CONFIG,appProductCode:PRODUCT_SERVICES){
    switch (appProductCode) {
        case PRODUCT_SERVICES.PERMIT_MANAGER_PRODUCT_CODE:case PRODUCT_SERVICES.START_STOP_REGISTER_MANAGER_PRODUCT_CODE:
            switch (actionName) {
                case ([PERMIT_ACTIONS_CONFIG.CREATE_PERMIT,PERMIT_ACTIONS_CONFIG.EDIT_PERMIT, PERMIT_ACTIONS_CONFIG.DELETE_PERMIT,
                     PERMIT_ACTIONS_CONFIG.DELETE_REINSTATEMENT, PERMIT_ACTIONS_CONFIG.EDIT_REINSTATEMENT, PERMIT_ACTIONS_CONFIG.ADD_REINSTATEMENT,
                     PERMIT_ACTIONS_CONFIG.ADD_NEW_COMMENT, PERMIT_ACTIONS_CONFIG.UPLOAD,PERMIT_ACTIONS_CONFIG.REVERT_START,
                     PERMIT_ACTIONS_CONFIG.REVERT_STOP,PERMIT_ACTIONS_CONFIG.START,PERMIT_ACTIONS_CONFIG.STOP].indexOf(actionName)+1 && actionName):
                    return  false;
                  default:
                    return null;
            }
          break;
        default:
          return null;
      }
  }

  getGlobalPersistantData(key){
    return this._appRepoService.appRepo.appGlobalPersistantData.get(key);
  }
  
  setGlobalPersistantData(key, value){
    return this._appRepoService.appRepo.appGlobalPersistantData.set(key, value);
  }
}
