import { Injectable } from '@angular/core';
//import { LoginAPIResponse } from 'src/app/models/dto/user-management/login-response';
import { SESSION_STORAGE_DATA_KEY } from '../app-constants';
import { LoginAPIResponse } from '../models/dto/user-management/login-response';


@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  getObject<T>(key: string): T | null {
    const valueJSON = sessionStorage.getItem(key);
    return JSON.parse(valueJSON);
  }
  setObject<T>(key: string, data: T): void {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  saveCurrentUser(userinfo: LoginAPIResponse) {
    this.setObject<LoginAPIResponse>(SESSION_STORAGE_DATA_KEY.USERINFO, userinfo);
  }

  getCurrentUser(): LoginAPIResponse {
    return this.getObject<LoginAPIResponse>(SESSION_STORAGE_DATA_KEY.USERINFO);
  }

  clearSessionStorage() {
    sessionStorage.clear();
  }

  setNavigationData(navigationData : Map<string,object>){
    let jsonText = JSON.stringify(Array.from(navigationData.entries()));
    this.setObject(SESSION_STORAGE_DATA_KEY.NAVIGATION_DATA,jsonText);
  }

  getNavigationData(): Map<string,object>{
    let navigationDataString = this.getObject<string>(SESSION_STORAGE_DATA_KEY.NAVIGATION_DATA);
    let navigationDataMap = new Map<string,object>(JSON.parse(navigationDataString));
    return navigationDataMap;
  }

}
