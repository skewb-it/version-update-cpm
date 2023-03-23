import { Injectable } from '@angular/core';
import { LoginAPIResponse } from 'src/app/models/dto/user-management/login-response';
import { LOCAL_STORAGE_DATA_KEY } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getObject<T>(key: string): T | null {
    const valueJSON = localStorage.getItem(key);
    return JSON.parse(valueJSON);
  }
  setObject<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
  removeObject<T>(key: string): void {
    localStorage.removeItem(key);
  }

  saveCurrentUser(userinfo: LoginAPIResponse) {
    this.setObject<LoginAPIResponse>(LOCAL_STORAGE_DATA_KEY.USERINFO, userinfo);
  }

  getCurrentUser(): LoginAPIResponse {
    return this.getObject<LoginAPIResponse>(LOCAL_STORAGE_DATA_KEY.USERINFO);
  }
  clearLocalStorage() {
    localStorage.clear();
  }
}
