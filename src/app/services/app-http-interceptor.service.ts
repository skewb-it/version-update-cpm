import { HttpEvent, HttpHandler, HttpHeaderResponse, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NAVIGATION_DATA, SESSION_STORAGE_DATA_KEY } from '../app-constants';
import { LocalStorageService } from './local-storage.service';
import { SessionStorageService } from './session-storage.service';
import { environment } from 'src/environments/environment';
import { MASTER_DATA } from '../constants/db.constants';
import { AppRepoHelperService } from './app-repo-helper.service';
import { AppRepoService } from './app-repo.service';
import { GLOBAL_PERSISTANT_DATA, PRODUCT_SERVICES } from '../constants/app-repo.constants';

@Injectable({
  providedIn: 'root'
})
export class AppHttpInterceptorService implements HttpInterceptor {

  clientid = "";
  workflowtype = "";
  sessiontoken = "";
  userroleuid;

  constructor(private _localStorageService: LocalStorageService,
    private _sessionStorageService: SessionStorageService,
    private _appRepoHelperService: AppRepoHelperService,
    private _appRepoService: AppRepoService
  ) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let headers: HttpHeaders = req.headers;

    if (req.url.includes(environment.baseurl)) {
      headers = headers.set('ProductCode', this._appRepoService.appRepo.appProductCode);
    }

    let interceptedReq = req;

    // clone the request to add the new header.
    if (this._sessionStorageService.getObject(SESSION_STORAGE_DATA_KEY.SESSION_TOKEN)) {
      this.sessiontoken = this._sessionStorageService.getObject(SESSION_STORAGE_DATA_KEY.SESSION_TOKEN);
      //this.clientid = this._sessionStorageService.getCurrentUser().clientid;
      //this.userroleuid = this._sessionStorageService.getCurrentUser().userroleuid;
      let token: any = this.sessiontoken;
      if (req.url.includes(environment.mapBaseUrl)) {
        token = this._sessionStorageService.getObject(NAVIGATION_DATA.SESSION_TOKEN);
      } 
    if (req.url.includes(environment.baseurl)) 
      {
        let userInfo: any = this._appRepoHelperService.getMDataByKey(MASTER_DATA.USER_INFO);
        let orgIds: any[] = [];
        let contractorIds: any[] = [];
        let stringOrgIds: any = '';
        let stringContractorIds: any = '';
        if(userInfo){
         
        }
        let selectedPromoterOrgnisation = this._appRepoHelperService.getGlobalPersistantData(GLOBAL_PERSISTANT_DATA.SELECTED_PROMOTER_ORGNISATION);
        if (userInfo && userInfo.user_access_details) {
        
          userInfo.user_access_details.forEach(element => {
            orgIds.push(element.org_id);
            if(selectedPromoterOrgnisation?.length){
              if(selectedPromoterOrgnisation.indexOf(element.org_id) > -1){
                element.contractor.forEach(elements => {
                  contractorIds.push(elements.contractorId);
                });
              }
            }else{
              element.contractor.forEach(elements => {
                contractorIds.push(elements.contractorId);
              });
            }
        });

        stringOrgIds = orgIds.length ? orgIds.join() : '';
        stringContractorIds = contractorIds.length ? contractorIds.join() : '';
        let selectContractor = this._appRepoHelperService.getGlobalPersistantData(GLOBAL_PERSISTANT_DATA.SELECTED_CONTRACTOR);        
        
        // let selectedPromoterOrgnisation = this._appRepoHelperService.getGlobalPersistantData(GLOBAL_PERSISTANT_DATA.SELECTED_PROMOTER_ORGNISATION);

         selectContractor = selectContractor && selectContractor.length ? selectContractor : stringContractorIds;
         selectedPromoterOrgnisation = selectedPromoterOrgnisation && selectedPromoterOrgnisation.length
          ? selectedPromoterOrgnisation : stringOrgIds;

         headers = headers.set('Orgids', selectedPromoterOrgnisation);
         headers = headers.set('ContractorIds', selectContractor);
        }
      }
        headers = headers.set('Authorization', 'Bearer ' + token)


    }

    interceptedReq = req.clone({
      headers: headers
    });

    return next.handle(interceptedReq) as any;
  }


}
