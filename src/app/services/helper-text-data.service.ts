import { Injectable } from '@angular/core';
import { AppRepoService } from './app-repo.service';

@Injectable({
  providedIn: 'root'
})
export class HelperTextDataService {

  constructor(
    private _appRepoService: AppRepoService
  ) { }

  getHelperTextData(helpTextId) {
    return  this._appRepoService.appRepo.helperTextDataById.get(helpTextId);
  }

}
